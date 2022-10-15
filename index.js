const express = require("express");
const app = express();
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const routes = require("./router/router");

app.set("view engine", "ejs");
app.use("/", routes);


// Start the server
app.listen(80, function(err){
    if (err) console.log(err);
    console.log("Server listening on http://localhost:80");
}); 

