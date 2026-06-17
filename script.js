const player=document.getElementById("player");

const enemy=document.getElementById("enemy");

const obstacle=document.getElementById("obstacle");

const scoreText=document.getElementById("score");

const highscoreText=document.getElementById("highscore");

const lifeText=document.getElementById("life");

let playerX=150;

let playerY=60;

let enemyX=20;

let obstacleX=1000;

let score=0;

let life=3;

let jumping=false;

let gameOver=false;

let highscore=localStorage.getItem("highscore")||0;

highscoreText.innerHTML=highscore;

document.addEventListener("keydown",(e)=>{

if(gameOver) return;

if(e.key==="ArrowRight"){

playerX+=20;

}

if(e.key==="ArrowLeft"){

playerX-=20;

}

if(e.code==="Space"&&!jumping){

jump();

}

if(playerX<0){

playerX=0;

}

if(playerX>window.innerWidth-80){

playerX=window.innerWidth-80;

}

player.style.left=playerX+"px";

});

function jump(){

jumping=true;

let height=60;

let naik=setInterval(()=>{

height+=10;

player.style.bottom=height+"px";

if(height>=220){

clearInterval(naik);

let turun=setInterval(()=>{

height-=10;

player.style.bottom=height+"px";

if(height<=60){

clearInterval(turun);

jumping=false;

}

},20);

}

},20);

}

function endGame(){

gameOver=true;

if(score>highscore){

localStorage.setItem("highscore",score);

}

alert("GAME OVER");

location.reload();

}

function loop(){

if(gameOver) return;

score++;

scoreText.innerHTML=score;

obstacleX-=8;

enemyX+=0.8;

enemy.style.left=enemyX+"px";

obstacle.style.left=obstacleX+"px";

if(obstacleX<-50){

obstacleX=window.innerWidth+200;

}

let tinggi=parseInt(player.style.bottom)||60;

if(

playerX+60>obstacleX &&

playerX<obstacleX+40 &&

tinggi<150

){

life--;

lifeText.innerHTML=life;

obstacleX=window.innerWidth+200;

}

if(enemyX+60>=playerX){

endGame();

}

if(life<=0){

endGame();

}

}

setInterval(loop,50);