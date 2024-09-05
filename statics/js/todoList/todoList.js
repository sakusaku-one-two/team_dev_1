// 重要度に基づいてTODOリストをソートする関数
export function sortTodosByPriority() {
    const todoList = document.querySelector('.todo-list');
    const todos = Array.from(todoList.children);
    todos.sort((a, b) => {
        const priorityA = parseInt(a.dataset.priority, 10);
        const priorityB = parseInt(b.dataset.priority, 10);
        return priorityB - priorityA; // 降順でソート
    });
    todos.forEach(todo => todoList.appendChild(todo)); // ソートされた順にDOMを再配置
}