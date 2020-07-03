const express = require('express');
const settingsRouter = express.Router();

settingsRouter.get('/settings', function(req, res, next) {
    res.render('settings');
});

module.exports = settingsRouter;