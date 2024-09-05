const isRange = (a,b) =>{
    const currentTime = new Date().getHours();
    return a <= currentTime && currentTime <= b ;
};



const selectTreeNumber = {
    0:0,
    1:1,
    2:1,
    3:2,
    4:3,
    5:4,
    6:5,
    7:5,
    8:6,
    9:6 ,
    10:7    
};


const TimeZone = () => {

    if (isRange(4,8)) return 'sunrise';
    if (isRange(9,18)) return 'noon';
    return  'night';

};


export default function setTree() {

    fetch('api/count',{
        method:'GET',
        headers:{
            'Content-Type': 'json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const count = JSON.stringify( data.count);
        const treeDom = document.getElementById('tree');
        treeDom.src = `images/tree/tree_${TimeZone()}_${selectTreeNumber[count]}.png` 
    }).catch (error => console.log(error))
    
}