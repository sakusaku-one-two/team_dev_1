

const DeleteTodo = () => {
    const id = localStorage.getItem("task_id");
    if (!id) return;

    const task_id = new Number(id);

    fetch("api/delete",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:task_id})
    }).then(res => res.json())
    .then(data => {
        
        if (data.success){
            localStorage.removeItem("task_id");
            location.reload(true);
        } else {
            alert(data.message);
        }
        

    })

};

export default DeleteTodo;