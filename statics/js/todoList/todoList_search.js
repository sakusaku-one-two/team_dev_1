export function searchTodos(searchText) {
    const todos = document.querySelectorAll('.todo-item');
    todos.forEach(todo => {
        const title = todo.querySelector('.todo-title span').textContent.toLowerCase();
        const isVisible = title.includes(searchText.toLowerCase());
        todo.style.display = isVisible ? '' : 'none';
    });
}