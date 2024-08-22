document.addEventListener('DOMContentLoaded', function() {
    const createCards = (contentList) => {
        contentList.forEach(element => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const cardContent = document.createElement('p');
            cardContent.innerText = element.content;
            card.appendChild(cardContent);
    
            const cardContainer = document.getElementById('x');
            cardContainer.appendChild(card);
        });
    }
    
    function callApi() {
        fetch('https://127.0.0.1:8443/api/api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                alert('通信失敗');
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const targetDom = document.getElementById('x');
            createCards(data.message);
        })
        .catch(error => {
            alert('error');
        });
    }
    
    const getApi = () => {
        fetch('/api/sample', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                alert('通信失敗');
                throw new Error('通信失敗しました。');
            }
            return response.json();
        })
        .then(data => {
            const targetDom = document.getElementById('x');
            targetDom.innerText = '';
            createCards(data.message);
        })
        .catch(error => {
            alert(error);
        });
    }
    
    document.getElementById('sampleGet').addEventListener('click', getApi);

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);
        fetch('/api/sample', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            alert('ok');
        })
        .catch(e => {
            alert(e);
            console.log('error', e);
        });
    });

    document.getElementById('searchButton').addEventListener('click', (event) => {
        const inputValue = document.getElementById('find').value;
        alert(inputValue);

        // クエリパラメータをURLに追加
        const url = new URL('/api/sample',window.location.origin);
        url.searchParams.append('search', encodeURIComponent(inputValue));

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('取得できませんでした');
                const data = response.json();
                alert(data.query)
            }
            return response.json();
        })
        .then(data => {
            const targetDom = document.getElementById('x');
            targetDom.innerText = '';
            createCards(data.message);
        })
        .catch(error => {
            alert(error.body);
        });
    });
});