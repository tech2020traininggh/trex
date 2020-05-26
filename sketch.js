var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

//added in c-18
var cloudsGroup, cloudImage
var obstaclesGroup, obsacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//added in C19
var score=0;
var gameOverImg, restartImg;
var gameOver, restart;

var PLAY=1;
var END=0;
var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg= loadImage("gameOver.png");
  restartImg= loadImage("restart.png");

}

function setup() {
  createCanvas(600, 400);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  //added on c19
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3*score/100);
  
  //added in c19
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale =0.5;
  
   restart = createSprite(300,100);
  restart.addImage(restartImg);
  restart.scale =0.5;
  
  gameOver.visible = false;
  restart.visible= false;

  //--------------------------------
  
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  background(220);

  text("Score: " + score, 500, 50);
  
 if (gameState===PLAY){
   
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);

        if(keyDown("space") && trex.y >= 159) {
          trex.velocityY = -12;
        }

        trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0){
          ground.x = ground.width/2;
        }

        trex.collide(invisibleGround);
        spawnClouds();
        spawnObstacles();

        if(obstaclesGroup.isTouching(trex)){
            gameState = END;
        }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}


function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(60, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(60, 120, 40, 10);
    obstacle.y = Math.round(random(80, 120));
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;

    }

    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }

}