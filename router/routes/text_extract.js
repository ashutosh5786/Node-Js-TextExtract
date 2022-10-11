const express = require("express");
const router = express.Router();
const { S3 } = require('@aws-sdk/client-s3');
const AWS = require("aws-sdk");

const regionConfig = 'ap-south-1';
// Credentials for AWS account
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
AWS.config.update({region:regionConfig});

// Creating the textract client
const textract = new AWS.Textract();
// Connect to S3 to display image
// const s3 = new AWS.S3();

const bucket = "nodejs-file";
const name = "download.pdf";

// Define paramaters
const params = {
    Document: {
      S3Object: {
        Bucket: bucket, // @TODO define a veriable with same name as the bucket name above this code snipper
        Name: name // Same as above
      },
    },
    FeatureTypes: ['FORMS', 'TABLES'],
  }
textract.analyzeDocument(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    });

module.exports = router; 