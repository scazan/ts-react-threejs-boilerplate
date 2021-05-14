const fs = require('fs');
const AWS = require('aws-sdk');
const mime = require('mime');
const readdir = require('recursive-readdir');

const s3 = new AWS.S3({
    region: 'eu-north-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const copyToS3 = async (path, body, contentType) => {
  const params = {
    CacheControl: 'max-age=60',
    Bucket: process.env.S3_BUCKET,
    Key: path,
    ContentType: contentType,
    Body: body,
  };

  return s3.putObject(params, err => {
    if (err) {
      console.log(err);
    }
  })
    .promise();
};

const putFile = async (path, body) => {
  const contentType = mime.getType(path) || 'text/html';

  let success = false;
  try {
    success = await copyToS3(path, body, contentType);
  }
  catch (e) {
    console.log('ERROR', e);
    success = false;
  }

  return success;
};

// Read through all files in the dir
const getFiles = async (dirPath) => {
  return fs.existsSync(dirPath) ? readdir(dirPath) : [];
};

// get all files in the build directory and upload them
const artifactPath = 'build/';
getFiles(`./${artifactPath}`)
  .then(files => {
    files.forEach(filePath => {
      const fileData = fs.readFileSync(filePath);

      const bareFilePath = filePath.split(artifactPath).join('');
      console.log('deploying ', filePath);
      return putFile(bareFilePath, fileData);
    });
  });
