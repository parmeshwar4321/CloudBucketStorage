require("dotenv/config");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

function s3Url(file) {
  const s3Bucket = new AWS.S3({
    accessKeyId: process.env.Access_Key_Id,
    secretAccessKey: process.env.Secret_Access_Key,
  });
  console.log(process.env.Secret_Access_Key);

  const newFileName = uuidv4() + "-" + file.originalname;
  //   const bucket = s3Bucket.createBucket(process.env.Bucket_Name);
  //   const doc = bucket.file("All-Images/" + newFileName);

  //   const blogStream = doc.createWriteStream({ resumable: false });
  //   console.log(blogStream);

  const params = {
    Bucket: process.env.Bucket_Name,
    Body: file.buffer,
    Key: uuidv4() + "-" + file.originalname,
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (er, data) => {
      if (er) {
        reject(er);
      } else {
        const publicUrl = `https://s3.amazonaws.com/${process.env.Bucket_Name}/${data.Key}`;
        resolve(publicUrl);
      }
    });
  });
}

module.exports = { s3Url };
