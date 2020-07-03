$(document).ready(function() {
  const settings_form = document.querySelector(".settings_form");
  const settings_questions = document.querySelector(".settings_questions");
  const questions_input = document.querySelector(".questions_input");
  const settings_submit = document.querySelector(".settings_submit");

  let questions = "";

  function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    //선택된 btn의 부모인 li 지움
    settings_questions.removeChild(li);
  }
    
  function paintTodo(text) {
    const li = document.createElement("li");

    //삭제 버튼
    const delBtn = document.createElement("span");
    delBtn.innerText = "  [X]";
    delBtn.addEventListener("click", deleteToDo);

    //질문 텍스트
    const span = document.createElement("span");
    span.innerText = text;
  
    //새로 만든 html 요소 html 문서에 appendChild 하기
    li.appendChild(span);
    li.appendChild(delBtn);
    settings_questions.appendChild(li);
  }
  
  function handleSubmit(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
    
      const currentValue = questions_input.value;
    
      paintTodo(currentValue);
      questions_input.value = "";
    }
  }

  function submitSettings() {
    //엔터로 전송되는 것 막음
    event.preventDefault();

    const length = $('li').length;

    if(length <= 0) {
      alert("예상 질문을 입력해주세요!");
    } else {
        for (i=1; i<=length; i++) {
          if(i < length) {
            questions = questions + String($("ul li:nth-child(" + i + ") span").html()) + "@";
          } else {
            questions = questions + String($("ul li:nth-child(" + i + ") span").html());
          }
        }
    
        questions_input.value = questions;
        settings_form.submit();
        questions_input.value = "";
    }
  }

  settings_submit.addEventListener("click", submitSettings);
  
  function init() {
    $('input[type="text"]').keydown(handleSubmit);
  }
  
  init();
})
