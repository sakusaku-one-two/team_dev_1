// 重要度に基づいてTODOリストをソートする関数
export function sortTodosByPriority(order) {
    sortTodos('priority', order);
}

// 直近のタスク順にソートする関数
export function sortTodosByReminderDate(order) {
    sortTodos('reminder-date', order);
}

// 作成日順にソートする関数
export function sortTodosByCreationDate(order) {
    sortTodos('creation-date', order);
}

// 汎用的なソート関数
function sortTodos(sortType, order) {
    const todoList = document.querySelector('.todo-list');
    const todos = Array.from(todoList.children);
    if (sortType === 'priority') {
        todos.sort((a, b) => {
            const diff = parseInt(a.dataset.priority) - parseInt(b.dataset.priority);
            return order === 'asc' ? diff : -diff;
        });
    } else if (sortType === 'creation-date') {
        todos.sort((a, b) => {
            const diff = parseInt(a.id) - parseInt(b.id); // IDが日付順に割り当てられていると仮定
            return order === 'asc' ? diff : -diff;
        });
    } else if (sortType === 'reminder-date') {
        todos.sort((a, b) => {
            const diff = new Date(a.dataset.reminderDate) - new Date(b.dataset.reminderDate); // 日付のフォーマットを確認し、必要に応じて修正
            return order === 'asc' ? diff : -diff;
        });
    }
    todos.forEach(todo => todoList.appendChild(todo));
}