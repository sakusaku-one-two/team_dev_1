export default function CreateTodo( todo ){
    
    const {id,priority,prevDate,nextDate} = todo;
    const todoItem = document.createElement('li');
    
    todoItem.className = 'todo-item';
    todoItem.id = id;

    const priorityStars = '★'.repeat(priority);

    const todoText = `
        <div class="todo-text">
            <span>${priorityStars}</span>
        </div>
        <div class="todo-actions">
            <span>PREV ${prevDate}</span>
            <span>NEXT ${nextDate}</span>
            <button><img src="path/to/edit-icon.png" alt="Edit" class="icon icon-edit"></button>
            <button><img src="path/to/check-icon.png" alt="Check" class="icon icon-check"></button>
        </div>
    `;

    todoItem.innerHTML = todoText;
    return todoItem;
}