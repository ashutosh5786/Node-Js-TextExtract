const express = require("express");
const router = express.Router();
const { S3 } = require("@aws-sdk/client-s3");
const AWS = require("aws-sdk");

const regionConfig = "ap-south-1";
// Credentials for AWS account
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
AWS.config.update({ region: regionConfig });

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
      Name: name, // Same as above
    },
  },
  // FeatureTypes: ['FORMS', 'TABLES'], // Use this when you want to use analyzeDocument in textract.analyzeDocument
};

const displayBlockInfo = async (response) => {
  try {
    response.Blocks.forEach((block) => {
      console.log(`ID: ${block.Id}`);
      console.log(`Block Type: ${block.BlockType}`);
      if ("Text" in block && block.Text !== undefined) {
        console.log(`Text: ${block.Text}`);
      } else {
      }
      if ("Confidence" in block && block.Confidence !== undefined) {
        console.log(`Confidence: ${block.Confidence}`);
      } else {
      }
      if (block.BlockType == "CELL") {
        console.log("Cell info:");
        console.log(`   Column Index - ${block.ColumnIndex}`);
        console.log(`   Row - ${block.RowIndex}`);
        console.log(`   Column Span - ${block.ColumnSpan}`);
        console.log(`   Row Span - ${block.RowSpan}`);
      }
      if ("Relationships" in block && block.Relationships !== undefined) {
        console.log(block.Relationships);
        console.log("Geometry:");
        console.log(
          `   Bounding Box - ${JSON.stringify(block.Geometry.BoundingBox)}`
        );
        console.log(`   Polygon - ${JSON.stringify(block.Geometry.Polygon)}`);
      }
      console.log("-----");
    });
  } catch (err) {
    console.log("Error", err);
  }
};

router.post("/api/extract", async (req, res) => {
textract.detectDocumentText(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else displayBlockInfo(data); // successful response
});
    res.status("200").send("Extracted");
});

module.exports = router; // Exporting the router to be used in router.js
