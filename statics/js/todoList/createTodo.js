import setTree from "../three/tree.js";


const getPrevAndNext = (reminders) => {
    if (reminders === null || reminders.length === 0) return {prevDate: '',nextDate:''};
    
    // filterで個々のリマインダーの状態　0＝＞未完了　1＝＞完了でふるいにかける　そしてmapで残ったリマインダーから日付を取得して　ソートする。
    const prevDates = reminders.filter(reminder => reminder.status === 0).map(reminder => new Date(reminder.reminder_date)).sort((a,b) => a - b);
    const nextDates = reminders.filter(reminder => reminder.status !== 0 ).map(reminder => new Date(reminder.reminder_date)).sort((a,b) => a - b);
    const totalDateNumber = reminders.map(rem => rem.date_number).join(",");
    console.log(totalDateNumber);
    return {
        prevDate: prevDates.length > 0 ? prevDates[0].toISOString().split('T')[0]:'',
        nextDate: nextDates.length > 0 ? nextDates[nextDates.length -1 ].toISOString().split('T')[0]: '',
        totalDateNumbers:totalDateNumber
    };


};



//todoを引数にDOMとしてのTODOを新しく作成する。
export default function CreateTodoDom( todo ){
    
    const {id,priority,reminders,title} = todo;
    const {prevDate,nextDate,totalDateNumbers} = getPrevAndNext(reminders);
    const todoItem = document.createElement('li');
    
    todoItem.className = 'todo-item';
    todoItem.id = id;
    todoItem.dataset.priority = priority; // priority属性を追加

    const priorityStars = Array(priority).fill('<img src="images/icon/star_1.png" alt="star" class="todo-icon icon-star">').join('');
    const blankStars = priority < 5 ?  Array(5 - priority).fill('<img src="images/icon/star_0.png" alt="blackStar" class="todo-icon icon-star">').join('') : '' ;


    const todoText = `
        <div class="todo-text">
            <div class="todo-text-child todo-star">
                <span>${priorityStars + blankStars}</span>
                <span>${todo.status}</span>
            </div>
            <div class="todo-text-child todo-title">
                <span>${title}</span>
            </div>
        </div>
        <div class="todo-actions">
            <div class="todo-action">
                <p>PREV</p>
                <span>${prevDate}</span>
            </div>
            <div class="todo-action">
                <p>NEXT</p>
                <span>${nextDate}</span>
            </div>
            <button class="edit-button"><img class="icon-edit" src="images/icon/edit.png" alt="Edit"></button>
            <button class="check-button" ><img class="icon-check-box" src="images/icon/check_box.png" alt="Check"></button>
        </div>
    `;

    todoItem.innerHTML = todoText;
    
    const editButton = todoItem.querySelector('.edit-button');
    editButton.addEventListener('click',() =>{
        document.getElementById('title').value = title;
        document.getElementById('priority').value = priority;
        document.getElementById('reminder-time').value = totalDateNumbers;
    });



    const doneButton = todoItem.querySelector('.check-button');
    doneButton.addEventListener('click',() =>{
        
        fetch(`/api/task_checked`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        }).then(res => {
            const result = res.json();
            if (!res.ok || !result.success ){

                console.log(result.error);
            
            }
            return result;
        }).then(data => {
           
            const status_dom = document.getElementById(`${id}_status`);
            status_dom.innerText = 1;
            setTree();
        }).catch(error =>{
            console.log(error.message);
        }) 
    });
    
    
    
    
    
    
    return todoItem;

}