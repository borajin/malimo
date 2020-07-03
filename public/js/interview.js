'use strict'

/*
    생각시간 > 답변시간 싸이클 질문 수마다 돌아가게 함.
    이때 생각시간인지 답변시간인지 싸이클 끝났는지는 status 로 체크.
    
    생각시간 : status = 0
    답변시간 : status = 1
    싸이클종료 : status = 2
    질문 수 : count

    count 만큼 0->1->2 싸이클 반복함. 
*/

let camera, recorder;

let status = Number(-1);

const video = document.querySelector('video');
const think_time_html = document.querySelector('#think_time');
const answer_time_html = document.querySelector('#answer_time');
const expected_questions_html = document.querySelector('#expected_questions');
const pass_btn = document.querySelector('#pass_btn');

const think_time_num = Number(think_time_html.innerText);
const answer_time_num = Number(answer_time_html.innerText);
const expected_questions = expected_questions_html.innerText.split('@');

let count = 0;
let max_count = expected_questions.length;

let interval;

//카메라 만들기
async function captureCamera() {
    try {
        camera = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } catch(err) {
        alert('Unable to capture your camera. Please check console logs.');
    }
}

//카메라 레코더로 등록하고 레코드 시작
function startRecordingCallback(camera) {
    video.muted = true;
    video.volume = 0;
    video.srcObject = camera;

    recorder = RecordRTC(camera, {
        type: 'video'
    });

    recorder.startRecording();

    // release camera on stopRecording
    recorder.camera = camera;
}

//레코드 종료
function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());

    var file = new File([recorder.getBlob()], 'test.webm', {
        type: 'video/webm'
    });

    var formData = new FormData();
    formData.append('file', file);
    uploadToServer(formData);

    /*
    const socket = io();
    socket.emit('upload', {data: file});
    */

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

//타이머
function timer(time_num, time_html) {
    var time_num = time_num;
    var time_html = time_html;

    interval = setInterval(()=>{
        if(time_num == -1) {
            pass_btn.click();
        } else {
            time_html.innerText = time_num;
        }
        time_num = time_num - 1;
    }, 1000);
}

function think_time() {
    expected_questions_html.innerText = expected_questions[count];
    timer(think_time_num, think_time_html);
    speak(expected_questions[count]);
}

async function answer_time() {
    await captureCamera();
    await startRecordingCallback(camera);
    await timer(answer_time_num, answer_time_html);
}

async function endAnswer() {
    await recorder.stopRecording(stopRecordingCallback);
    
    status = Number(-1);
    count = count + 1;

    pass_btn.click();
}

function startInterview() {
    if(status==0) {
        think_time();
     } else if(status==1) {
         answer_time();
     } else if(status==2) {
         endAnswer();
     }
}

function changeStatus() {
    status = Number(status) + Number(1);
    clearInterval(interval);
}

function speak(text) {
    if (typeof SpeechSynthesisUtterance === 'undefined' || typeof speechSynthesis === 'undefined') {
        alert('This browser does not support speech API');
        return;
    }

    const message = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();

    message.voice = voices[0];
    speechSynthesis.speak(message);
}

//pass btn 클릭 이벤트
function passEvent() {
    changeStatus();

    if(count < max_count) {
        startInterview();
    } else {
       
    }
}

pass_btn.addEventListener("click", passEvent);

pass_btn.click();