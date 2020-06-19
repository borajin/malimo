const express = require('express');
const indexRouter = express.Router();

//루트페이지 (직접 주소 치고 들어가는거니 get방식)
indexRouter.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = indexRouter;