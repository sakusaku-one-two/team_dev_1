
// すべてのタスクを取得する
const GetTasks = async () => {
    
    try {
        const response = await fetch('api/tasks',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('タスクの取得に失敗しました。');

        return await response.json();
    } catch(error) {
        return error;
    }

};


export default GetTasks;