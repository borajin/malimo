//npm i express --save
var express = require('express');  
var app = express();

//npm i body-parser --save
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//npm i ejs --save
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('./public'));

//루트페이지 (직접 주소 치고 들어가는거니 get방식)
app.get('/', function(req, res, next) {
    res.render('index');
});

//result page 라우팅
app.get('/settings', function(req, res, next) {
    res.render('settings');
});

app.post('/interview', function(req, res, next) {
    var think_time = req.body.think_time;
    var answer_time = req.body.answer_time;
    var expected_questions = req.body.expected_questions;
    var random_question = req.body.random_question;

    res.render('interview', {think_time: think_time, answer_time: answer_time, expected_questions: expected_questions, random_question: random_question});
});

app.get('/results', function(req, res, next) {
    var videos = req.query.videos;

    res.render('results', {videos: videos});
});

//서버 생성
var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080")
})