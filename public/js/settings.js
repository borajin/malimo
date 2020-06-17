$(document).ready(function() {
  const toDoForm = document.querySelector(".js-todoForm");
  const toDoInput = document.querySelector(".js-todoInput");
  const toDoList = document.querySelector(".js-toDoList");
  const submitBtn = document.querySelector(".submitBtn");

  let questions = "";

  function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    //선택된 btn의 부모인 li 지움
    toDoList.removeChild(li);
  }
    
  function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("span");
    delBtn.innerText = "  [X]";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
  
    //새로 만든 html 요소 html 문서에 appendChild 하기
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
  }
  
  function handleSubmit(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
    
      const currentValue = toDoInput.value;
    
      paintTodo(currentValue);
      toDoInput.value = "";
    }
  }

  function submitSettings() {
    event.preventDefault();

    const length = $('li').length;

    for (i=1; i<=length; i++) {
      questions = questions + String($("ul li:nth-child(1) span").html()) + ",";
    }

    toDoList.value = questions;

    toDoForm.submit();
  }

  submitBtn.addEventListener("click", submitSettings);
  
  function init() {
    $('input[type="text"]').keydown(handleSubmit);
  }
  
  init();

})
