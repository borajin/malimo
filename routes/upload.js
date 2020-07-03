const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

uploadRouter.post('/upload', upload.single('data'), function(req, res, next) {
    res.send('Uploaded: ' + req.file);
    console.log(req.file);
});

module.exports = uploadRouter;