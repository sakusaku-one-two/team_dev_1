
function callApi() {
    fetch('https://127.0.0.1:8443/api/api',{
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
};

const getApi = () => {
    fetch('https://127.0.0.1:8443/api/sample',{
        method: 'GET',
        headers: {
            'Content-Type': 'applicaion/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            alert('通信失敗');
            throw new Error('通信失敗しました。');
        }
        return response.json();
    })
    .then(data =>{
        const targetDom = document.getElementById('x');
        targetDom.innerText = JSON.stringify(data,null,2);
    })
    .catch(error => {
        alert(error);
    });
};


document.getElementById('sampleGet').addEventListener('click',getApi);
document.getElementById('fetchButton').addEventListener('click',callApi);
document.getElementById('form').addEventListener('submit',(event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log(jsonData);
    fetch('/api/sample',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:jsonData
    })
    .then(response => response.json())
    .then(data => {
        alert('ok');
    })
    .catch(e => {
        alert(e)
        console.log('error' ,e);
    });
});