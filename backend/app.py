from flask import (
    Flask,
    request,
    jsonify,
    abort,
    render_template,
    make_response,
    send_file,
)
from flask_restful import Api, Resource
import urllib3
import boto3
import os
import datetime
import requests
from io import StringIO
import sys

from flask_cors import CORS
import base64
from waitress import serve

app = Flask(__name__, static_folder="./dist/static", template_folder="./dist")

app.config.from_object("config.BaseConfig")

UPLOAD_FOLDER = "../upload"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["JSON_AS_ASCII"] = False

s3 = boto3.client(
    "s3",
    region_name="us-east-1",
    aws_access_key_id=app.config["AWS_ACCESS_KEY"],
    aws_secret_access_key=app.config["AWS_SECRET_ACCESS_KEY"],
)

CORS(app)
api = Api(app)


class createAnnotation(Resource):
    def post(self):
        s3_bucket = app.config["S3_BUCKET"]
        annotation_name = request.form["title"]
        current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
        if "file" not in request.form:
            return abort(400, {"msg": "ファイルを入力してください"})
        is_image = bool(int(request.form["isImage"]))
        print(is_image)
        if not is_image:
            base64fileStorageObj = request.form["file"][21:]
            fileStorageObj = base64.b64decode(base64fileStorageObj)
            filename = "annotation" + annotation_name + current_time + ".csv"
            with open(filename, "wb") as f:
                f.write(fileStorageObj)

            upload_to_s3 = s3.put_object(
                Body=open(filename, "rb"),
                Bucket=s3_bucket,
                Key=filename,
            )
            if upload_to_s3["ResponseMetadata"]["HTTPStatusCode"] != 200:
                return jsonify(message="S3へのアップロードでエラーが発生しました"), 500
            os.remove(filename)
        else:
            print("start image")
            zip_file_str = request.form["image"]
            zip_file = zip_file_str[zip_file_str.find(",") + 1 :]
            zip_file_decoded = base64.b64decode(zip_file)
            zip_filename = "annotation" + annotation_name + current_time + "_image.zip"
            with open(zip_filename, "wb") as f:
                f.write(zip_file_decoded)
            upload_zip_to_s3 = s3.put_object(
                Body=open(zip_filename, "rb"), Bucket=s3_bucket, Key=zip_filename
            )
            if upload_zip_to_s3["ResponseMetadata"]["HTTPStatusCode"] != 200:
                return jsonify(message="S3へのアップロードでエラーが発生しました"), 500
            os.remove(zip_filename)

        post_data = {
            "s3_name": filename,
            "annotation_name": annotation_name,
            "is_image": is_image,
        }

        response = requests.post(app.config["BASE_URL"] + "annotation", json=post_data)
        print(response)

        if response.status_code != 200 or response.json()["status"] != "SUCCESS":
            return jsonify(message="アノテーション作成でエラーが発生しました")

        annotation_id = response.json()["annotation_id"]

        return jsonify({"message": "upload_success"})


class getCSV(Resource):
    def get(self):
        annotaiton_id = request.args.get("annotationId")
        filename = annotaiton_id + "_result.csv"
        s3_bucket = app.config["S3_BUCKET"]
        try:
            obj = s3.get_object(Bucket=s3_bucket, Key=filename)
        except:
            return abort(400, "正しいデータを入力してください")

        response = make_response()

        response.data = obj["Body"].read()

        response.headers["Content-Type"] = "text/csv"
        response.headers["Content-Disposition"] = "attachment; filename=" + filename

        return response


@app.route("/")
@app.route("/<path:path>")
def index(path=None):
    return render_template("index.html")
    pass


api.add_resource(createAnnotation, "/api/reg_file")
api.add_resource(getCSV, "/api/get_csv")


@app.errorhandler(400)
def costom400(error):
    return jsonify({"message": error.description["message"]})


if __name__ == "__main__":
    # app.run(debug=False)
    serve(app, host="0.0.0.0", port=5000)
