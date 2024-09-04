import sample from "./apis/api.js";
import setTimeOfDayImage from "./timeManage/setDayImage.js";
import CreateTask from "./apis/createTask.js";
import CreateTodoDom from "./todoList/createTodo.js";
import GetTasks from "./apis/getTasks.js";
import setTree from "./three/tree.js";
import { setupAllHovers } from './ImageFunction/hover.js'; // hover切り替えモジュール
import { setupAllClicks } from './ImageFunction/click.js'; // click切り替えモジュール

// 画面がロードされたら実行されるコールバック関数（初期化処理を記載）
document.addEventListener("DOMContentLoaded",async function(){
    void setTimeOfDayImage();//時間帯ごとに画像を変える関数 内部でdomを入れ替えるので返り値はないことを示すvoidを表記
    void setTree();
    setupAllHovers(); // hover機能を初期化
    setupAllClicks(); // click機能を初期化

    const todoForm = document.getElementById('todo-form');
    
    
    const todoList = document.querySelector('.todo-List');
    
    GetTasks((allTasks)=>{
        console.log("all tasks get");
        if (!Array.isArray(allTasks)){
            console.log(allTasks);
            return ;
        }
        allTasks.map(task =>{
            const taskItem = CreateTodoDom(task);
            const todoList = document.querySelector('.todo-list');
            todoList.appendChild(taskItem);
        });
    });
    
    
    const timelineItems = document.querySelector('.timeLine-items');

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