
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, reset
var runningman, man, run1_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  runningman = loadAnimation ('run1.png','run2.png','run3.png','run4.png','run5.png')

  run1_collided = loadAnimation("run1_collided.png");
  
  groundImage = loadImage("ground2.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png")
  resetImage=loadImage("reset.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  


  
  back = createSprite(width/2+100,height/2,width,height);
 back.addImage("ground",groundImage);
  back.scale=5;


 man = createSprite(50,height-80,20,50);
 man.addAnimation("running", runningman);
 man.scale = 0.5;

  invisibleGround = createSprite(200,height-70,400,10);
  invisibleGround.visible = false;
  
  gameover = createSprite(300,90,10,10);
  gameover.addImage("gameover",gameoverImage)
  gameover.scale = 0.5
  
  reset = createSprite(300,130,10,10)
  reset.addImage("reset",resetImage)
  reset.scale = 0.5
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
 man.setCollider("circle",0,0,40);
  man.debug = false
  
  score = 0
}

function draw() {
 background(0)
  //displaying score

  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    
    gameover.visible=false
    reset.visible=false
    
    //move the ground
    back.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (back.x < 200){
      back.x = back.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& man.y >=100) {
        man.velocityY = -13;
    }
    
    //add gravity
    man.velocityY = man.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(man)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      //ground.velocityX = 0;
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     man.changeAnimation("collided",run1_collided);
     man.velocityY=0
   reset.visible=true
     gameover.visible=true
   }
  
 
  //stop trex from falling down
  man.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

