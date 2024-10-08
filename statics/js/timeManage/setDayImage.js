const isinRange =(min,max,value) =>  min <= value && value <= max;

function whatTimeRange() {
    
    const now_time = new Date().getHours();

    if (isinRange(4,7,now_time)) return 'images/sunrise.png'; //４時から７時の間なら朝日を表示

    if (isinRange(8,16,now_time)) return 'images/noon.png';//　8時から１６時の間なら太陽を表示

    if (isinRange(17,19,now_time)) return 'images/sunset.png';//１7時から19時の間なら夕日を表示

    return 'images/moon.png';//4時から19時以外の時間なら月を表示
}  


const formatDate = (date) =>{
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
    };

    return date.toLocaleDateString('en-US',options);
};


export default function setTimeOfDayImage(){
    const imageElement = document.getElementById('day-image');
    const dayTime = document.getElementById('day-time');
    dayTime.innerText = formatDate(new Date());
    if (imageElement) {
        imageElement.src = whatTimeRange(); //画像のsrcを時刻に合わせて取得
    }

}


