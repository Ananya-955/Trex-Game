var trex, ground, invisibleGround, Score;
var trexRunning, trexCollided, trexDucked;
var groundImage, crowImage, cloudImage, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var gameOverImage, restartImage;
var gameOver, restart;
var cloudGroup, cactusGroup, crowGroup;

function preload(){
 trexRunning=loadAnimation("trex1.png", "trex3.png","trex4.png");
 trexCollided=loadImage("trex_collided.png"); 
 trexDucked=loadImage("Dino 1.png");
 groundImage=loadImage("ground2.png");
 crowImage=loadImage("Bird.png");
 cloudImage=loadImage("cloud.png");
 cactus1=loadImage("obstacle1.png");
 cactus2=loadImage("obstacle2.png");
 cactus3=loadImage("obstacle3.png");
 cactus4=loadImage("obstacle4.png");
 cactus5=loadImage("obstacle5.png");
 cactus6=loadImage("obstacle6.png");
 gameOverImage=loadImage("gameOver.png");
 restartImage=loadImage("restart.png")
}

function setup() {
  createCanvas(600,300);
  
  trex=createSprite(50,260,20,20);;
  trex.addAnimation("running", trexRunning);
  trex.addImage("ducking", trexDucked);
  trex.scale=0.5;
  
  ground=createSprite(300,280,600,10);
  ground.addImage("ground", groundImage);
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(300,290,600,10);
  invisibleGround.visible=false;
  
  cactusGroup=createGroup();
  crowGroup=createGroup();
  cloudGroup=createGroup();
  
  Score=0;
}

function draw() {
  background(180);
  textSize(20);
  
  //stroke("white");
  text("Score: " +Score, 500,100);
  
  if (keyDown("space") && trex.y>250){
    trex.velocityY=-12;  
  }
  //add gracity to trex
  trex.velocityY=trex.velocityY+0.8;
  
  if (keyWentDown(DOWN_ARROW)){
    trex.changeImage("ducking", trexDucked);
    trex.scale=0.15;
  }
  
  if (keyWentUp(DOWN_ARROW)){
    trex.changeAnimation("running", trexRunning);
    trex.scale=0.5;
  }
  
  //trex collide with ground
  trex.collide(invisibleGround);
  
  Score=Score+Math.round((getFrameRate()/30));
  
  console.log(trex.y);
  
  if (ground.x<0){
    ground.x= ground.width/2;
  }
  
  ground.velocityX=-5;
  
  //call the functions 
  spawnClouds();
  
   //score conditions to display cactus
  if (Score>0 && Score % 1000>0 && Score % 1000<500){
    spawnObstacles();
  }
  
  //score condition to dispay crows
  if (Score>0 && Score % 1000>500 && Score % 1000<999){
    flyCrows();
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60===0){
    var cloud=createSprite(600,190,40,10);
    cloud.addImage("cloud",cloudImage);
    cloud.scale=0.5;
    cloud.velocityX=-5;
    cloud.y=Math.round(random(200,220));
    trex.depth=cloud.depth+1;
    cloud.lifetime=130;
    
    cloudGroup.add(cloud);
    
  }
}

function flyCrows (){
  //to spawn the crows
  if (frameCount % 80===0){
    var crow=createSprite(600,200,20,20);
    crow.addImage("Bird.png",crowImage);
    crow.scale=0.1;
    crow.velocityX=-(5+(Score/100));
    crow.y=Math.round(random(200,280));
    crow.lifetime=120;
    
     //if (crow.visible===true){
      //cactusGroup.destroyEach();
    //}
    
    crowGroup.add(crow);
    
   
  }
}

function spawnObstacles(){
  //to spawn the cactus
  if (frameCount % 80===0){
    var cactus=createSprite(600,265,10,40);
    var r=Math.round(random(1,6));
    switch(r){
      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break;
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus4);
      break;
      case 5: cactus.addImage(cactus5);
      break;
      case 6: cactus.addImage(cactus6);
      break;
      default: break;
    }
    cactus.scale=0.5;  
    cactus.velocityX=-(5+(Score/100));
    cactus.lifetime=125;
    
    cactusGroup.add(cactus);
  }
}

function reset1(){
  //reset the game when we click on restart
  gameOver.visible=false;
  reset.visible=false;
  
  gameState=PLAY;
  
  trex.setAnimation("trex");
  trex.scale=0.5;
  
  crowGroup.destroyEach();
  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  
  Score=0;

}