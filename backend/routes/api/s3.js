const express = require("express");

const router = express.Router();
const s3 = require("../../utils/test");
const s4 = require("../../utils/s4")

router.get("/imageUpload", async (req, res) => {
  const url = await s3.genUploadURL();
  res.send({ url });
});
router.get('/songUpload/:id', async (req, res) => {
  console.log('weve hit')
  const url = await s4.generateUploadUrl(req.params.id);
  res.send({url})
})

module.exports = router;
