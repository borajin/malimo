const think = document.querySelector('.think_time');
const answer = document.querySelector('.answer_time');
const step = 5;

function plus(b) {
    if(b == 'think') {
        if(Number(think.value) >= think.max) {
            think.value = think.max;
        } else {
            think.value = Number(think.value) + Number(step);
        }
        
    } else if(b == 'answer') {
        if(Number(answer.value) >= answer.max) {
            answer.value = answer.max;
        } else {
            answer.value = Number(answer.value) + Number(step);
        }
    }
}

function minus(b) {
    if(b == 'think') {
        if(Number(think.value)<= think.min) {
            think.value = think.min;
        } else {
            think.value = Number(think.value) - Number(step);
        }
        
    } else if(b == 'answer') {
        if(Number(answer.value) <= answer.min) {
            answer.value = answer.min;
        } else {
            answer.value = Number(answer.value) - Number(step);
        }
    }
}