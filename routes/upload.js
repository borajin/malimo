const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '../public/uploads/'});
const type = upload.single('upl');

uploadRouter.post('/upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.file);
});

module.exports = uploadRouter;