const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");
const express = require("express");
const router = express.Router();
const { S3 } = require('@aws-sdk/client-s3');
const AWS = require("aws-sdk");
// Use Image-Size to get 
const sizeOf = require('image-size');
// Image tool to draw buffers
const images = require("images");
// Create a canvas and get the context
const { createCanvas } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')



module.exports = router; 