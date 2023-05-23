const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;
const AWS = require('aws-sdk');
const path = require('path');
module.exports = (type, file) => {
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
  });
  const fileName =
    file.fieldname + '_' + Date.now() + path.extname(file.originalname);
  const params = {
    Bucket,
    Key: `${type}/${fileName}`,
    Body: file.buffer,
    ACL: 'public-read',
  };
  directory = s3.upload(params, async (err, data) => {
    if (err) {
      return err;
    }
    return data;
  });
  return fileName;
};
