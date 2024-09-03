function TodoSpeach(){
    //音声を再生するアロー関数
    const speak = (txt) =>{
        if('speechSynthesis' in window) console.log("このブラウザは音声APIがあります");
        const utterance = new SpeechSynthesisUtterance(txt);//音声オブジェクトを作成
        utterance.lang = "ja-JP"; //日本語に設定
        window.speechSynthesis.speak(utterance);//音声を再生
    };

    fetch("api/today_speach",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        console.log("it speach");
        if(!res.ok) return JSON.stringify({text:"通信が失敗しました。"});
        return res.json();
    }).then(data => {
        const txtData = data.text;
        console.log(txtData);
        speak(txtData);
    }).catch(error => console.log(error.message));

}


export default TodoSpeach;