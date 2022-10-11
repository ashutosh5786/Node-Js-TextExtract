const express = require("express");
const router = express.Router();
//  TDOO Implement the other files like upload to S3 and delete from S3 and sending the requiest to textextract
const upload = require("./routes/upload");

//Default routes
router.get("/", (req, res) => {
  res.send("Helo World");
}); // TODO Implement the Frontend

// router.post("/api/getAll", getAll);

//routing for upload
router.post("/api/upload", upload);

// router.get(/api/, (req, res) => {
//     res.send("Invalid API");
// }).post(/api/, (req, res) => {
//     res.send("Invalid API");
// });


module.exports = router;
