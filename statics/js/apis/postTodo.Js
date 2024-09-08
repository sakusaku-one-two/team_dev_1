const check  = (post,update) => {
    const task_id = localStorage.getItem("task_id");

    if (!task_id) {
        post();
    } else {
        update(task_id);
        localStorage.removeItem("task_id");
    }

} ;


const getData = () =>{
    const title = document.getElementById("title").value;
    const priority = new Number(document.getElementById("priority").value);
    const reminders = document.getElementById("reminder-time").value;

    

    const reminders_as_array = reminders?  reminders.split(",").map(str => new Number(str)) : [] ;

    
    return {
        title:title,
        priority:priority,
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
            } else {
                location.reload(true);
                const res_ = await res.json();
               
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
                alert("更新に失敗しました。");
            } else {
                
                const resjson = await res.json();
                location.reload(true);
            }
            

        } catch(err) {
            console.log(err.message);
        } 
    };

    void check(post,update);

    
        
};


export default PostAndUpdate;
