const uploadFile = require("../models/uploadfile");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth_user = require("../middleware/authuser");
const fs = require("fs");

const Path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
router.post(
  "/upload",
  auth_user,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const SecurityKey = Math.floor(100000 + Math.random() * 900000);
      const file = new uploadFile({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
        fileKey: SecurityKey,
        uploadedby: req.user,
      });
      await file.save();
      res
        .status(201)
        .send({ message: "File Uploaded Successfully", data: file });
      //   console.log(req.user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
//////////////////////////////////////////////// get all files uploaded by logged in user
router.get("/uploadedfiles_by_user", auth_user, async (req, res) => {
  try {
    const getfiles = await uploadFile
      .find({ uploadedby: req.user._id })
      .populate("uploadedby", "_id Name");
    if (getfiles == "") {
      return res.json({
        message: "files not found",
        success: false,
        data: getfiles,
      });
    } else {
      return res.json({ message: "success", success: true, data: getfiles });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
////////////////////////////////////////////////// delete the particular file
router.delete("/deletefile/:id", auth_user, async (req, res) => {
  try {
    const id = req.params.id;
    let data = await uploadFile.findById(id);
    // console.log(req.user);
    console.log(data.filePath.toString());
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    if (data.uploadedby._id.toString() === req.user._id.toString()) {
      data = await uploadFile.findByIdAndDelete(id);
      fs.unlinkSync(data.filePath);
      res.json({ message: "data has been deleted successfully", data: data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//////////////////////////////////////////////////download file by id
router.get("/downloadfile/:id", auth_user, async (req, res) => {
  try {
    const file = await uploadFile.findById(req.params.id);
    res.set({
      "Content-Type": file.fileType,
    });
    res.sendFile(Path.join(__dirname, "..", file.filePath));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

module.exports = router;
