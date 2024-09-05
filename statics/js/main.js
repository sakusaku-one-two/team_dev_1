import sample from "./apis/api.js";
import setTimeOfDayImage from "./timeManage/setDayImage.js";
import CreateTask from "./apis/createTask.js";
import CreateTodoDom from "./todoList/createTodo.js";
import GetTasks from "./apis/getTasks.js";
import setTree from "./three/tree.js";
import { setupAllHovers } from './ImageFunction/hover.js'; // hover切り替えモジュール
import { setupAllClicks } from './ImageFunction/click.js'; // click切り替えモジュール
import TodoSpeach from "./apis/todoSpeach.js";
import { sortTodosByPriority, sortTodosByReminderDate, sortTodosByCreationDate } from './todoList/todoList_sort.js'; // ソートモジュール

// 画面がロードされたら実行されるコールバック関数（初期化処理を記載）
document.addEventListener("DOMContentLoaded",async function(){
    void setTimeOfDayImage();//時間帯ごとに画像を変える関数 内部でdomを入れ替えるので返り値はないことを示すvoidを表記
    void setTree();
    setupAllHovers(); // hover機能を初期化
    setupAllClicks(); // click機能を初期化

    const todoForm = document.getElementById('todo-form');
    const treeDon = document.getElementById("tree");
    treeDon.addEventListener("click",() =>{
        void TodoSpeach();
    })
    
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

    // ソートボタンのイベントリスナー
    document.getElementById('sort-button').addEventListener('click', function(event) {
        event.preventDefault();
        let sortMenu = document.getElementById('sort-menu');
        sortMenu.style.display = sortMenu.style.display === 'block' ? 'none' : 'block';
    });

    // メニュー外をクリックした時にメニューを閉じる
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-button') && !event.target.closest('.dropdown-contents')) {
            var dropdowns = document.getElementsByClassName("dropdown-contents");
            Array.from(dropdowns).forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    };

    // ソートオプションのクリックイベント
    document.querySelectorAll('#sort-menu a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.getAttribute('data-sort-type');
            const order = this.getAttribute('data-order'); // 正しくオーダー属性を取得

            if (sortType === 'priority') {
                sortTodosByPriority(order);
            } else if (sortType === 'reminder-date') {
                sortTodosByReminderDate(order);
            } else if (sortType === 'creation-date') {
                sortTodosByCreationDate(order);
            }
            document.getElementById('sort-menu').style.display = 'none';
        });
    });
});

