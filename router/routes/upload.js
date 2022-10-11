const express = require("express");
const router = express.Router();
const fs = require('fs');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const app = express();

// To verify the credential for aws uncomment thsee line from 11 to 17
// AWS.config.getCredentials(function(err) {
//     if (err) console.log(err.stack);
//     // credentials not loaded
//     else {
//       console.log("Access key:", AWS.config.credentials.accessKeyId);
//     }
//   });


// Create S3 service object
// Set the region
// AWS.config.update({ region: "ap-south-1" });
// const { s3 } = require("aws-sdk");

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Credentials for AWS account
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;


app.use(bodyParser.json());

const upload = multer({
    limits: { fileSize: 2000000  },
    storage: multerS3({
      s3: s3,
      bucket: "nodejs-file",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        // filenames = file.originalname;
        // var fullPath = 'products/' + file.originalname
        console.log(file)
        cb(null, file.originalname);
      },
    }),
  });

router.post("/api/upload", upload.array('myFile', 25), async (req, res) => { // always try to use the upload.array() method its the only way & for the single file use upload.single('myFile) this filed should be same as the name of the file in the form
    upload(req, res, (err) => {
      console.log('files', req.files)
      if (err) console.log(err);
      else { // if the file not found 
        if(req.files === undefined){
          res.send("Error: No File Selected!");
        } else {
            console.log("File uploaded successfully");
        }
      }
    });
  });


module.exports = router; // Exporting the router to be used in router.js
