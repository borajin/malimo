const express = require('express');
const resultsRouter = express.Router();
const PythonShell = require('python-shell');

resultsRouter.get('/results', function(req, res, next) {
    var options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
    };

    PythonShell.run('./recognition/speech_to_text.py', options, function (err, results) {
        if (err) throw err;
        console.log('results: %j', results);
    });
});

module.exports = resultsRouter;