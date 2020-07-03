const express = require('express');
const resultsRouter = express.Router();

resultsRouter.get('/results', function(req, res, next) {
    res.render('results');
});

module.exports = resultsRouter;