const getPrevAndNext = (reminders) => {
    if (reminders === null || reminders.length === 0) return {prevDate: '',nextDate:''};
    
    // filterで個々のリマインダーの状態　0＝＞未完了　1＝＞完了でふるいにかける　そしてmapで残ったリマインダーから日付を取得して　ソートする。
    const prevDates = reminders.filter(reminder => reminder.status === 0).map(reminder => new Date(reminder.reminder_date)).sort((a,b) => a - b);
    const nextDates = reminders.filter(reminder => reminder.status !== 0 ).map(reminder => new Date(reminder.reminder_date)).sort((a,b) => a - b);

    return {
        prevDate: prevDates.length > 0 ? prevDates[0].toISOString().split('T')[0]:'',
        nextDate: nextDates.length > 0 ? nextDates[nextDates.length -1 ].toISOString().split('T')[0]: ''
    };


};


//todoを引数にDOMとしてのTODOを新しく作成する。
export default function CreateTodoDom( todo ){
    
    const {id,priority,reminders,title} = todo;
    const {prevDate,nextDate} = getPrevAndNext(reminders);
    const todoItem = document.createElement('li');
    
    todoItem.className = 'todo-item';
    todoItem.id = id;

    const priorityStars = Array(priority).fill('<img src="images/icon/star_1.png" alt="star" class="icon icon-star">').join('');
    const blankStars = priority < 5 ?  Array(5 - priority).fill('<img src="images/icon/star_0.png" alt="blackStar" class="icon icon-star">').join('') : '' ;


    const todoText = `
        <div class="todo-text">
            <span>${title}</span>
            <span>${priorityStars + blankStars}</span>
        </div>
        <div class="todo-actions">
            <span>PREV ${prevDate}</span>
            <span>NEXT ${nextDate}</span>
            <button class="edit-button"><img src="images/icon/edit.png" alt="Edit" class="icon icon-edit"></button>
            <button class="check-button" ><img src="images/icon/check_box.png" alt="Check" class="icon icon-check"></button>
        </div>
    `;

    todoItem.innerHTML = todoText;
    
    const editButton = todoItem.querySelector('.edit-button');
    editButton.addEventListener('click',() =>{
        document.getElementById('title').value = title;
        document.getElementById('priority').value = priority;
        document.getElementById('reminder-time').value = reminders.length;
    });
    
    
    
    
    
    
    return todoItem;

}