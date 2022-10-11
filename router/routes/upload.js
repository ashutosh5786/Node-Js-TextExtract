const express = require("express");
const router = express.Router();
const { S3 } = require('@aws-sdk/client-s3');
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");


// To verify the credential for aws uncomment thsee line from 11 to 17
// AWS.config.getCredentials(function(err) {
//     if (err) console.log(err.stack);
//     // credentials not loaded
//     else {
//       console.log("Access key:", AWS.config.credentials.accessKeyId);
//     }
//   });



// Create S3 service object
s3 = new S3({ apiVersion: "2006-03-01" });

// Credentials for AWS account
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;

const upload = multer({
    limits: { fileSize: 2000000  },
    storage: multerS3({
      s3: s3,
      bucket: "nodejs-file",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

router.post("/api/upload", upload.array('myFile', 25), async (req, res) => { // always try to use the upload.array() method its the only way & for the single file use upload.single('myFile) this filed should be same as the name of the file in the form
    try {
        if(req.files === undefined){
          res.status(400).send("No file selected");
        } else {
            res.status(200).send('Successfully uploaded ' + req.files.length + ' files!')
        }
        
    } catch (error) {
        console.log(error);
    }
  });


module.exports = router; // Exporting the router to be used in router.js
