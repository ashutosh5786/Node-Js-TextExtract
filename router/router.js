const express = require("express");
const router = express.Router();
//  TDOO Implement the other files like upload to S3 and delete from S3 and sending the requiest to textextract
const upload = require("./routes/upload");
const extract = require("./routes/text_extract");

//Default routes
router.get("/", (req, res) => {
  res.send("Hello There");
}); // TODO Implement the Frontend

router.post("/api/extract/:f", extract);
// TODO Implement the Frontend );

//routing for upload
router.post("/api/upload", upload);


router.post(/api/, (req, res) => {
    res.status(404).send("Invalid API");
});


module.exports = router;
