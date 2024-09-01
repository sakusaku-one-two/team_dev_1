// すべてのタスクを取得する
const GetTasks = async (call_back) => {
    
    try {    
        const response = await fetch('/api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // エラーレスポンスをログに記録
            console.error('Response error:', await response.text());
            throw new Error('タスクの取得に失敗しました。');
        }
        
        const tasks =  await response.json();
        
        call_back(tasks);

    } catch(error) {
        
        alert(error);

    }

        
};

export default GetTasks;