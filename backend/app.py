from flask import Flask, request, jsonify, abort, render_template
from flask_restful import Api, Resource
import os
import csv
from io import StringIO
from flask_cors import CORS
import base64
app = Flask(__name__, static_folder="./dist/static",template_folder="./dist")

UPLOAD_FOLDER = "../upload"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['JSON_AS_ASCII'] = False


CORS(app)
api = Api(app)


# class HelloWorld(Resource):
#   def get(self):
#     return render_template("index.html")

class SetAnnotation(Resource):
  def post(self):
    print("post success")
    print(request.form["file"])
    if "file" not in request.form:
      return abort(400, {"msg": "ファイルを入力してください"})
    base64fileStorageObj = request.form["file"][21:]
    fileStorageObj = base64.b64decode(base64fileStorageObj)#.decode("shift-jis")
    with open("decoded.csv", "wb") as f:
      f.write(fileStorageObj)
        
    # filename = fileStorageObj.filename
    # print(fileStorageObj)

    # with open(app.config["UPLOAD_FOLDER"])
    # reader.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
    return jsonify({"message": "upload_success"})

@app.route("/")
@app.route("/<path:path>")
def index():
    return render_template("index.html")
    pass


# api.add_resource(HelloWorld, "/")
api.add_resource(SetAnnotation, "/api/reg_file")

@app.route("/api/reg_file", methods=['POST'])
def uploadCsv():
  if request.method == "POST":
    file = request.form["file"]
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], file.filename))

@app.errorhandler(400)
def costom400(error):
  return jsonify({"message": error.description["message"]})

if __name__ == "__main__" :
  app.run(debug=True)