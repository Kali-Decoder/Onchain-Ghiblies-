const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");
const { uploadGibhli, getAllGibhlifys } = require("../controllers");
router.post("/upload", upload.single("imageUpload"), uploadGibhli);
router.get("/all-gibhlifys", getAllGibhlifys);

module.exports = router;
