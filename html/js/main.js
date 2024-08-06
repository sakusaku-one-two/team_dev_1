function callApi() {
    fetch('https://127.0.0.1:8443/api/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resoponce => {
        if (!resoponce.ok){
            alert('通信失敗');
            throw new Error("Network response  was not ok")
        }
        return resoponce.json();
    })
    .then(data => {
        const targetDom = document.getElementById('x');
        targetDom.innerText = JSON.stringify(data,null,2);
        
    })
    .catch(error => {
        alert('error')
    })
}

document.getElementById('fetchButton').addEventListener('click',callApi);