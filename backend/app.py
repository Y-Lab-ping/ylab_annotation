from flask import Flask, request, jsonify, abort, render_template
from flask_restful import Api, Resource
import boto3
import os
import datetime
import requests
from io import StringIO
from flask_cors import CORS
import base64
app = Flask(__name__, static_folder="./dist/static",template_folder="./dist")

app.config.from_object("config.BaseConfig")

UPLOAD_FOLDER = "../upload"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['JSON_AS_ASCII'] = False

s3 = boto3.client(
  "s3",
  region_name = "us-east-1",
  aws_access_key_id = app.config["AWS_ACCESS_KEY"],
  aws_secret_access_key = app.config["AWS_SECRET_ACCESS_KEY"]
)

CORS(app)
api = Api(app)

class SetAnnotation(Resource):
  def post(self):
    if "file" not in request.form:
      return abort(400, {"msg": "ファイルを入力してください"})
    base64fileStorageObj = request.form["file"][21:]
    fileStorageObj = base64.b64decode(base64fileStorageObj)
    s3_bucket = app.config["S3_BUCKET"]
    annotation_name = request.form["title"]
    filename = "annotation"+annotation_name+datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")+".csv"
    with open(filename, "wb") as f:
      f.write(fileStorageObj)
    
    upload_to_s3 = s3.put_object(
      Body = open(filename, "rb"),
      Bucket = s3_bucket,
      Key = filename,
    )
    if upload_to_s3['ResponseMetadata']['HTTPStatusCode'] != 200:
        return jsonify(message='S3へのアップロードでエラーが発生しました'), 500

    post_data = {
      "s3_name": filename,
      "annotation_name": annotation_name
    }

    response = requests.post(app.config["BASE_URL"]+"annotation", json= post_data)
    
    if response.status_code != 200 or response.json()["status"] != "SUCCESS" :
      return jsonify(message = "アノテーション作成でエラーが発生しました")
    
    annotation_id = response.json()["annotation_id"]
    os.remove(filename)
    return jsonify({"message": "upload_success"})

@app.route("/")
@app.route("/<path:path>")
def index():
    return render_template("index.html")
    pass


api.add_resource(SetAnnotation, "/api/reg_file")


@app.errorhandler(400)
def costom400(error):
  return jsonify({"message": error.description["message"]})

if __name__ == "__main__" :
  app.run(debug=True)