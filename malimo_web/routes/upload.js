const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');

// multer setting
const upload = multer({
    storage: multer.diskStorage({
      // set a localstorage destination
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      // convert a file name
      filename: (req, file, cb) => {
        var filename = file.originalname;
        cb(null, filename);
      },
    }),
  });

uploadRouter.post('/upload', upload.single('file'), function(req, res, next) {
    console.log(req.file);
});

module.exports = uploadRouter;