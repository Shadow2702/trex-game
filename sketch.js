var trex, trexRunning, edge, ground, groundimage, invisibleground, clouds, cloudimage, o1, o2, o3, o4, o5, o6, cloudgroup, obstaclegroup, hitbox, gameover, gameoverscreen, restart, restartscreen,jumpsound,diesound,checkpoint;

var score = 0;

var gamestate = "play";

function preload() {

  groundimage = loadImage("ground2.png");
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  cloudimage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  hitbox = loadImage("trex_collided.png");
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  jumpsound= loadSound("jump.mp3")
  diesound= loadSound("die.mp3")
  checkpoint= loadSound("checkPoint.mp3")
}

function setup() {


  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  ground = createSprite(200, 180, 400, 20);
  invisibleground = createSprite(200, 200, 400, 20);
  gameoverscreen = createSprite(300, 100);
  restartscreen = createSprite(300, 140);

  restartscreen.scale = 0.5;
  trex.scale = 0.5;

  invisibleground.visible = false;


  trex.addAnimation("Run", trexRunning);
  ground.addImage("floor", groundimage);
  trex.addImage("collide", hitbox);
  gameoverscreen.addImage("over", gameover);
  restartscreen.addImage("reset", restart);


  edge = createEdgeSprites();


  obstaclegroup = new Group();
  cloudgroup = new Group();
  trex.setCollider("circle", 0, 0, 40);
  trex.debug=true;
}


function draw() {
 
  background("white");

  text("score:" + score, 475, 10);

  if (gamestate == "play") {
    score = score + Math.round(frameCount / 400);
if (score%100==0&&score > 0){
  checkpoint.play()            
}
    gameoverscreen.visible = false;
    restartscreen.visible = false;

    if (keyDown("space") && trex.collide(invisibleground)) {
      trex.velocityY = -15;
      jumpsound.play()
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    trex.velocityY = trex.velocityY + 1 ;
    
    ground.velocityX = -(8+score/100);

    cloud();
    obstacle();

    if (trex.isTouching(obstaclegroup)) {
      gamestate = "end";
      diesound.play()
    }


  } 
  
    else if (gamestate == "end") {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);

    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);

    gameoverscreen.visible = true;
    restartscreen.visible = true;

    trex.changeImage("collide", hitbox);
      if (mousePressedOver(restartscreen)){
 reset();
  
}
  }  

  drawSprites();

  trex.collide(invisibleground);


}


function cloud() {

  if (frameCount % 60 == 0) {
    clouds = createSprite(600, 70, 10, 10);
    clouds.addImage(cloudimage);
    clouds.scale = 0.6;
    clouds.velocityX = -3;
    trex.depth = clouds.depth;
    trex.depth += 1;
    clouds.y = Math.round(random(30, 60));
    clouds.lifetime = 200;
    cloudgroup.add(clouds);
  }
}

function obstacle() {
  if (frameCount % 60 == 0) {

    var obstacles = createSprite(600, 165, 10, 40);
    
    obstacles.velocityX = -(8+score/100)
    
    var rand = Math.round(random(1, 6));
    
    switch (rand) {
      case 1:
        obstacles.addImage(o1);
        break;
      case 2:
        obstacles.addImage(o2);
        break;
      case 3:
        obstacles.addImage(o3);
        break;
      case 4:
        obstacles.addImage(o4);
        break;
      case 5:
        obstacles.addImage(o5);
        break;
      case 6:
        obstacles.addImage(o6);
        break;
      default:
        break;
    }
    
    obstacles.scale = 0.5;
    obstacles.lifetime = 75;
    obstaclegroup.add(obstacles);
  }
}
function reset(){
  
  gamestate="play"
  gameoverscreen.visible=false
  restartscreen.visible=false
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  score=0
}