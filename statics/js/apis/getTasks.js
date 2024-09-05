// すべてのタスクを取得する
const GetTasks = (call_back) => {
    try {
        fetch('/api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error("タスクの取得に失敗しました。");
            }
            return response.json()
        }).then(data => {
            call_back(data)
        }).catch(error => {
            console.log(error);
        });
    } catch(error) {
        console.log(error);
    }
};

export default GetTasks;