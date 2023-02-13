var AWS = require("aws-sdk");
var bodyParser = require("body-parser");
var multer = require("multer");
// アップロードされたファイルの一時格納フォルダ
var upload = multer({ dest: "/tmp/express/uploads/" });
var fs = require("fs");

// AWSのアクセスキーをjsonで記載
AWS.config.loadFromPath("config/aws-credentials.json");
// リージョンを指定
AWS.config.update({ region: "ap-northeast-1" });

module.exports = function (app) {
  // API設定
  var path = "/aws";
  // POSTパラメータの受取
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // アップロードAPI
  app.post(
    path + "/fileUpload",
    upload.single("file"),
    async function (req, res) {
      // S3のインスタンスを生成
      var s3 = new AWS.S3();
      // アップロード用のパラメータを設定
      var params = {
        // バケット名
        Bucket: "test",
        // アップロード後のファイル名(hogehoge/uploadfile.png などのディレクトリ指定も可)
        Key: req.file.originalname,
      };
      // fsで一時ディレクトリにアップロードされたファイルを読み込み
      var v = fs.readFileSync(req.file.path, (err, data) => {
        return data;
      });
      // パラメータに設定
      params.Body = v;
      // ファイルアップロード処理実行
      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err, err.message);
        } else {
          console.log("アップロード成功！");
        }
      });
    }
  );
};
