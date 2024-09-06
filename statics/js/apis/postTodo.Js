const check  = (post,update) => {
    const task_id = localStorage.getItem("task_id");

    if (!task_id) {
        post();
    } else {
        update(task_id);
    }

} ;


const getData = () =>{
    const title = document.getElementById("title").value ;
    const prioriry = document.getElementById("priority").value;
    const reminders = document.getElementById("reminders").value;

    const reminders_as_array = reminders === undefined ? [] : reminders.split(",");

    return  {
        title,
        prioriry,
        reminders:reminders_as_array
    };
}

const PostAndUpdate =  (event) => {
    event.preventDefault();
    

    const post = async () => {
         const data = getData();
         try {
            const res = await fetch("api/tasks",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });

            if(!res.ok){
                console.log("投稿失敗しました。")
            }

        }catch(error){
            console.log(error.message);
        }
    };


    const update = async(id) =>{
        const data = getData();
        
        try {
            const res = await fetch("api/tasks",{
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    id:id,...data
                })
            });

            if (!res.ok) {
                console.log("更新に失敗しました。");
            }


        } catch(err) {
            console.log(err.message);
        } 
    };

    void check(post,update);

    location.reload(true);
        
};


export default PostAndUpdate;
