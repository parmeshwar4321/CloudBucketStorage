const upload = require("./handler/multer");
const { s3Url } = require("./s3bucket/awsS3");
require("dotenv/config");
const express = require("express");
const app = express();

app.post("/upload", upload.single("img"), (req, res) => {
  s3Url(req.file)
    .then((data) => console.log(data))
    .catch((er) => console.log(er));
});
app.listen(3003, () => console.log(`SERVER IS RUNNING...`));
