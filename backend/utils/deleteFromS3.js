const AWS = require('aws-sdk');
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

module.exports = (filePath) => {
  try {
    const params = {
      Bucket: Bucket,
      Key: `posts/${filePath}`,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
