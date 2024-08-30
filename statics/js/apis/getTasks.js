// すべてのタスクを取得する
const GetTasks = async () => {
    
    try {
        const response = await fetch('api/tasks', {
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

        return await response.json();
    } catch(error) {
        console.error('Fetch error:', error);
        return error;
    }
};

export default GetTasks;