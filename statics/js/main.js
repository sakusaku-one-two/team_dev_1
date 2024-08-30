import sample from "./apis/api.js";
import setTimeOfDayImage from "./timeManage/setDayImage.js";
import CreateTask from "./apis/createTask.js";
import CreateTodo from "./todoList/createTodo.js";
import GetTasks from "./apis/getTasks.js";



document.addEventListener("DOMContentLoaded",function(){
    void setTimeOfDayImage();//時間帯ごとに画像を変える関数
    const response  = GetTasks();//dbから全タスクを取得
    
    response.then(data =>{
        alert(data);
    })

    const todoForm = document.getElementById('todo-form');
    const todoList = document.querySelector('.todo-List');
    const timelineItems = document.querySelector('.timeLine-items');
    alert()
    todoForm.addEventListener('submit',(event)=>{ //タスクの作成と更新ボタンが押された際ののコールバック
        event.preventDefault();//　これはsubmitイベントの規定処理である画面遷移をキャンセルするための呪文

        const title = document.getElementById('title').value;
        const priority = document.getElementById('priority').value;
        const reminderTime = document.getElementById('reminder-time').value;


        CreateTask(title,priority,reminderTime)
        .then(data => {
            const todo = JSON.parse(data);//todo : {id:number,prioriry:number,prevDate:date,nextDate:date}
            todoList.appendChild(
                CreateTodo(todo)
            ); 

        })


    });


});