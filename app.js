//npm i express --save
const express = require('express');  
const cors = require('cors');
//const FileReader = require('filereader');
const fs = require('fs');

const indexRouter = require('./routes/index');
const settingsRouter = require('./routes/settings');
const interviewRouter = require('./routes/interview');
const resultsRouter = require('./routes/results');

const app = express();

//npm i body-parser --save
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//npm i ejs --save
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//정적파일 경로 지정
app.use(express.static('./public'));

app.use(cors());

app.use('/', indexRouter);
app.get('/settings', settingsRouter);
app.post('/interview', interviewRouter);
app.get('/results', resultsRouter);

//서버 생성
const server = app.listen(8080, function(){
    console.log("Express server has started on port 8080");
})

/*
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('upload', function(data) {
        console.log(data);

        fs.writeFile('./test.webm', data, 'utf8', function(err) {

        });
    })
})
*/