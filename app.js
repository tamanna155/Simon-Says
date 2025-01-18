let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let h2=document.querySelector("h2");

let btns=["red","yellow","green","blue"];

let audio= new Audio("./level.mp3");
let fail=new Audio("./fail.mp3");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    if(level<6){
        setTimeout(function(){
            btn.classList.remove("flash");
        },500);  
    }
    else if(level<10){
        setTimeout(function(){
            btn.classList.remove("flash");
        },300);
    } else {
        setTimeout(function(){
            btn.classList.remove("flash");
        },250);
    }
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    audio.play();
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //Choosing a random button
    let ranNum=Math.floor(Math.random()*3);
    let ranCol=btns[ranNum];
    gameSeq.push(ranCol);
    let ranBtn=document.querySelector(`.${ranCol}`);
    btnFlash(ranBtn);
}

let allBtns=document.querySelectorAll(".btn");

function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),2000);
        }
    } else{
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br>Press any key to start again.`;
        fail.play();
        document.querySelector("body").style.backgroundColor="rgb(222, 62, 62)"; //red
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgb(205, 199, 199)"; //orignal color
        }, 150);
        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}