let alarmtimes=[];
let alarmInterval;

function goal(){
    var hover=document.getElementsByClassName ("hov")[0]
     hover.style.display="none"
    const bedtime=sessionStorage.getItem("bed")
    const wakeup=sessionStorage.getItem("wake")
    const status=document.getElementsByClassName("status")[0];

    if(!bedtime || !wakeup){
     status.innerText="please set both bedtime and wakeup time.";
    }
    const bed=new Date(`2024-12-15T${bedtime}:00`)
    const wake=new Date(`2024-12-15T${wakeup}:00`)

    if(bed<=wake){
         bed.setDate(bed.getDate()+1);
    }
    
    const totalduration= bed-wake
    const interval=totalduration/8;
    alarmtime=[]
    for(i=0;i<8;i++){
        alarmtimes.push(new Date(wake.getTime()+ i * interval))
    }

    status.innerText=alarmtimes.map((time) => formattime(time)).join(" ")
    
    checkalarms()
    clearInterval(alarmInterval)
    alarmInterval=setInterval(checkalarms , 1000)
}

 
function checkalarms(){
    const now=new Date();
    const currenttime=formattime(now);

    alarmtimes.forEach((alarmtime,index)=>{
        if(currenttime === formattime(alarmtime)){
           sendnotification(alarmtime);
           alarmtimes.splice(index,1);
        }
    })


    if(alarmtimes.length===0){
        const midnight=new Date();
        midnight.setHours(0,0,0,0);
        const timemidnight=midnight.getTime()+24*60*60*1000-Date.now();
        setTimeout(startalarms,timemidnight);
        highlightDrops(0); 
        updateBigdrop(0);
    }

}
function sendnotification(alarmtime){
    alert(`Remainder: Drink water! It's  ${formattime(alarmtime)}`)
    const audio = new Audio("./remainder.mp3");
    audio.play();  
}


function formattime(date){
    const hours=date.getHours().toString().padStart(2, "0");
    const minutes=date.getMinutes().toString().padStart(2, "0")
    return`${hours}:${minutes}`
}

const alarm= document.getElementsByClassName("alarm")[0]
function alarms(){
    alarm.style.visibility="visible";
}
function exits(){
    alarm.style.visibility="hidden";
}



// intake goal

var changegoal=document.getElementsByClassName("setgoal")[0]
function exit(){
    changegoal.style.visibility="hidden"
    }

    function opengoal(){
    changegoal.style.visibility="visible"
     }

     let dailyGoal;
     const goals= document.getElementsByClassName("text")[0]


    // intake goal  functionality
    const setgoal=document.getElementById("btns")
    setgoal.addEventListener("click", function () {
    changegoal.style.visibility="hidden"
    const water=document.getElementById("watergoal").value
        if(water<=0){
           alert("Please enter a valid number greater thenn 0")
         }
        else if( water && water>0){
           dailyGoal=`${water}ltr`
           sessionStorage.setItem("customgoal",dailyGoal);
     }
     
    
    updateGaolDisplay();
    updateBigdrop();


     })

//get weight 
     let weight= sessionStorage.getItem("weight") 
     if(!weight){
        weight=70
        sessionStorage.setItem("weight" ,weight)
        console.log(weight)
     }
     const weightgoal=(weight *0.035).toFixed(2)
    
     function updateGaolDisplay(){

     dailyGoal=sessionStorage.getItem("customgoal")||`${weightgoal}ltr`

     goals.innerText=dailyGoal

     goals.style.color="white"
     goals.style.fontSize="30px"
  

     }
  

// cups functionlity  
const smallDrops = document.querySelectorAll('.drop-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')
const small= document.querySelectorAll('small')
var hover=document.getElementsByClassName("hover")[0]
let totalml
// smalldrops functonality
smallDrops.forEach((drop, ind)=>{
    drop.addEventListener('click', () => highlightDrops(ind))
})
function highlightDrops(ind){
    smallDrops.forEach((drop, ind2) => {
       if(ind2 <= ind){
        drop.classList.add("full")
        
       }
       else{
        drop.classList.remove("full")
       }
    });

    updateBigdrop()
}

// bigdrop functionality
function updateBigdrop(){
    const fulldrops=document.querySelectorAll(".drop-small.full").length
    totaldrops=smallDrops.length
    if(!dailyGoal){
        updateGaolDisplay();
    }

     totalml=parseFloat(dailyGoal)*1000
     total= Math.ceil(totalml/smallDrops.length)
     small.forEach(drop => {
      drop.innerText = `${total}ml`;
    });

    if(fulldrops === 0){
        percentage.style.visibility="hidden"
        percentage.style.height = 0
    }
    else{
        percentage.style.visibility="visible"
        percentage.style.height=`${fulldrops/totaldrops * 330}px`
        percentage.innerText=`${fulldrops/totaldrops*100}%`
        
    }
    if(fulldrops==totaldrops){
       
        hover.style.display="inline-block"
        remained.style.visibility = 'hidden'
        remained.style.height = 0
        
        sessionStorage.setItem("customgoal",dailygoal);
    
    }
    else{
        
        remained.style.visibility="visible"
        // let goal= sessionStorage.getItem("goals")
        liters.innerText=`${totalml-(total * fulldrops).toFixed(2)}ml`
    }
}

// congratulations functionality
function cmplgoal(){    
    hover.style.display="none"
 } 
 updateGaolDisplay()
 updateBigdrop()







