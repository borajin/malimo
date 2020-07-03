const express = require('express');
const interviewRouter = express.Router();

interviewRouter.post('/interview', function(req, res, next) {
    const think_time = req.body.think_time;
    const answer_time = req.body.answer_time;
    const expected_questions = req.body.expected_questions;

    res.render('interview', {think_time : think_time, answer_time : answer_time, expected_questions : expected_questions});
});

module.exports = interviewRouter;