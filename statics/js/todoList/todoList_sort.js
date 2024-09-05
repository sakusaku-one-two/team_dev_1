// 重要度に基づいてTODOリストをソートする関数
export function sortTodosByPriority() {
    sortTodos('priority');
}

// リマインダー日付順にソートする関数
export function sortTodosByReminderDate() {
    sortTodos('reminder-date');
}

// 作成日付順にソートする関数
export function sortTodosByCreationDate() {
    sortTodos('creation-date');
}

// 汎用的なソート関数
function sortTodos(sortType) {
    const todoList = document.querySelector('.todo-list');
    const todos = Array.from(todoList.children);
    if (sortType === 'priority') {
        todos.sort((a, b) => parseInt(b.dataset.priority) - parseInt(a.dataset.priority));
    } else if (sortType === 'reminder-date') {
        todos.sort((a, b) => new Date(a.dataset.reminderDate) - new Date(b.dataset.reminderDate));
    } else if (sortType === 'creation-date') {
        todos.sort((a, b) => new Date(a.dataset.creationDate) - new Date(b.dataset.creationDate));
    }
    todos.forEach(todo => todoList.appendChild(todo));
}