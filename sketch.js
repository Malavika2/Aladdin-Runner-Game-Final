var aladdin, lampgrp, invground, obs, aladdincol, speed;

var aladdinimg, lampimg, backgroundimg, collided;

var score, gamestate, PLAY, END, INITIAL, col;

var obstaclesGroup, obstacle1, obstacle2, obstacle3

var bgSound;

function preload() {

  aladdinimg = loadAnimation("aladdin1.png","aladdin2.png","aladdin3.png","aladdin4.png","aladdin5.png","aladdin6.png","aladdin7.png","aladdin8.png","aladdin9.png");

  backgroundimg = loadImage("desert.jpg");

  lampimg = loadImage("Lamp.png");

  obstacle1 = loadImage("barrel 1.png");
  obstacle2 = loadImage("barrel 2.png");
  obstacle3 = loadImage("barrel 3.png");
  
  collided = loadImage("aladdin.png");

  bgSound = loadSound("arabian.mp3");

}

function setup() {
  createCanvas(800, 400);

  bg = createSprite(200, 150);
  bg.addImage("bgimg", backgroundimg);
  bg.scale = 1.2

  invground = createSprite(width / 2, 390, width, 10);
  invground.visible = false;

  aladdin = createSprite(80, 340);
  aladdin.addAnimation("collided",collided);
  aladdin.addAnimation("aladdinimg", aladdinimg);
  
  aladdin.scale = 0.4;

  score = 0;

  gamestate = 1;
  PLAY = 1;
  END = 0;

  lampgrp = new Group();
  obstaclesGroup = new Group();

  speed = -8;

  col = 0;

  bgSound.loop();
}

function draw() {
  background(220);

  if (gamestate === PLAY) {
    
    aladdin.changeAnimation("aladdinimg");

    camera.x = aladdin.x;

    bg.velocityX = -5;

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    if (keyWentDown("space") && aladdin.collide(invground)) {
      aladdin.velocityY = -25;
    }

    aladdin.velocityY = aladdin.velocityY + 1;

    lamp();
    obstacles();

    score = score + Math.round((getFrameRate() / 30));

  } 

  aladdin.collide(invground);

  if (gamestate === END) {
    bg.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    lampgrp.setVelocityXEach(0);
    lampgrp.setLifetimeEach(-1);

    aladdin.velocityY = 0;
    
    aladdin.changeAnimation("collided",collided);

  }

  if (keyWentDown("r") && gamestate === END) {
    obstaclesGroup.destroyEach();
    lampgrp.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    aladdin.scale = 0.4;
    col = 0;
  }

  for(var i=0;i<lampgrp.length;i++){
    if(lampgrp.get(i).isTouching(aladdin)){
      lampgrp.get(i).destroy();
      speed = speed - 0.5;
      if(aladdin.scale<0.4){
        aladdin.scale = aladdin.scale + 0.02;
      }
      score = score + 20;
      col = 0;
    }
  }

  if (score % 100 === 0) {
    if(aladdin.scale<0.4){
      aladdin.scale = aladdin.scale + 0.01;
    }
    
  }

  if (col === 2) {
    gamestate = END;
  }

  for(var i=0;i<obstaclesGroup.length;i++){
    if (obstaclesGroup.get(i).isTouching(aladdin)) {
      obstaclesGroup.get(i).destroy();
      aladdin.scale = 0.3;
      score = score - 100;
      col += 1;
    }
  }

  drawSprites();

  if (gamestate === END) {

    fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Game Over!", width / 2 - width / 10, height / 2);
    text("Press R to Restart", width / 2 - width / 6.7, height / 2 + 30);
  }

  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 40, height / 8);
}
function lamp(){
  if(frameCount%80 === 0){
    var lamp = createSprite(600,250,40,10);
    lamp.y = Math.round(random(120,200));
    lamp.addImage(lampimg);
    lamp.scale=0.2;
    lamp.velocityX=-5;
    lamp.lifetime=300;
    
    aladdin.depth=lamp.depth+1;
    
    lampgrp.add(lamp);
  }
}
function obstacles(){
  if(frameCount%100===0){
    
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -5;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }
}