

const DeleteTodo = () => {
    const id = localStorage.getItem("task_id");
    if (!id) return;

    const task_id = new Number(id);

    fetch("api/tasks",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:task_id})
    }).then(res => res.json())
    .then(data => {
        
        
        location.reload(true);

    })

};

export default DeleteTodo;