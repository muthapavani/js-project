// weight
let weight=70
var val;
var weit;
function increase(){
    weight++;
 val=document.getElementsByClassName("we")[0]
  val.innerText=weight;
  sessionStorage.setItem("weight", weight);
}

function decrease(){
    if(weight>1){
    weight--;
   val= document.getElementsByClassName("we")[0]
   val.innerText=weight;
   sessionStorage.setItem("weight", weight);
}
}


function gender(){
window.location.assign("./gender.html")
}

function sleep(){
window.location.assign("./sleeptime.html") 
 val=document.getElementsByTagName("span")[0]
}




 
// sleep time

let sleeps=8;
function decreases(){
    if(sleeps>1){
    sleeps--;
    document.getElementsByTagName("span")[0].innerText=sleeps;
    sessionStorage.setItem("sleep", sleeps);
}}
function increases(){
    if(sleeps<24){
    sleeps++;
    document.getElementsByTagName("span")[0].innerText=sleeps;
    sessionStorage.setItem("sleep", sleeps);
}}

   sessionStorage.setItem("sleep",sleeps)




let btn=document.getElementById("btn")
btn.addEventListener("click",function(){
    let bed=document.getElementById("bed").value
    sessionStorage.setItem("bed",bed)
    let wake=document.getElementById("wake").value
    sessionStorage.setItem("wake",wake)
})
  
 
 function weights(){
    window.location.assign("./weight.html")
 }
 function main_page(){
    window.location.assign("./main.html")
 }




  

