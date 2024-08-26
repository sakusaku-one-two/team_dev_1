


document.addEventListener("DOMContentLoaded",function(){
    const todoForm = document.getElementById('todo-form');
    const todoList = document.querySelector('.todo-List');
    const timelineItems = document.querySelector('.timeLine-items');

    todoForm.addEventListener('submit',(event)=>{ //タスクの作成と更新ボタンが押された際ののコールバック
        event.preventDefault();//　これはsubmitイベントの規定処理をキャンセルさせるための呪文

        const title = document.getElementById('title').value;
        const priority = document.getElementById('priority').value;
        const reminderTime = document.getElementById('reminder-time').value;


        addTodoItem(title,priority,reminderTime);
        
    });


});