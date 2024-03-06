const express = require("express");

const router = express.Router();
const s3 = require("../../utils/test");

router.get("/imageUpload", async (req, res) => {
  const url = await s3.genUploadURL();
  res.send({ url });
});

module.exports = router;
