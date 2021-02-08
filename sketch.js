var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var coin;
var score = 0;
var bomb
var coinscollect = 0;
var energydrink = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;


function preload(){
  pathImg = loadImage("path.png");
  coinImg = loadImage("coin.png");
  energyImg = loadImage("energyDrink.png");
  bombImg = loadImage("bomb.png");
  gameOverImg = loadImage("gameover.png");
  powerImg = loadImage("power.png");
  boyImg = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG","jake5.png");
}

function setup(){
  
 var canvas = createCanvas(700,700);
 canvas.position(10,30)
 //bomb.setCollider("rectangle",0,0,20,20)
 coinGroup = new Group();
 energyGroup = new Group();
 bombGroup = new Group();

// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//creating boy running
boy = createSprite(180,620,30,30);
boy.addAnimation("JakeRunning",boyImg);
  //boy.debug =true
  
// create left Boundary
leftBoundary=createSprite(0,0,50,1400);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(630,0,500,1400);
rightBoundary.visible = false;
}

function draw() {
  background(0);
  if (gameState === PLAY){
  path.velocityY = 4;
 
  // boy moving on Xaxis with mouse
  //boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  //text(mouseX + ","+mouseY , 600,100)
  //code to reset the background
  if(path.y > 700 ){
    path.y = height/2;
  }

 if(keyDown("right")){
    boy.velocityX +=2
 }

 if(keyDown("left")){
  boy.velocityX -=2
}
if(keyDown("space")){
  boy.velocityY -=2
}
boy.velocityY = boy.velocityY + 0.5

  textSize(20);
  fill("white")
  text("Score: "+ score, 440,50);
  text("Coins Collected: "+ coinscollect,440,100);
  text("Energy Drink: "+ energydrink,440,150);

  score = score + Math.round(getFrameRate()/60);

  if (boy.isTouching(coinGroup)) {
    coinGroup.destroyEach();
    coinscollect = coinscollect + 1;
    score = score + 20;
   }
   if(boy.isTouching(energyGroup)){
    // power = createSprite(200,500);
    // power.addImage(powerImg);
 
 
     //path.velocityY = 0;
     //coinGroup.destroyEach();
     energyGroup.destroyEach();
     //bombGroup.destroyEach();
     textSize(10)
     text("POWER++",200,500)
     energydrink = energydrink + 1;
   }
   if (boy.isTouching(bombGroup)){
     gameState = END;
   }

  }

  if(gameState === END){
   gameOver = createSprite(340,350);
    gameOver.addImage(gameOverImg);
    gameOver.scale=1.8
    coinGroup.destroyEach();
    energyGroup.destroyEach();
    bombGroup.destroyEach();
    path.velocityY = 0;
    
    coinGroup.setVelocityEach(0, 0)
    bombGroup.setVelocityEach(0, 0)
    energyGroup.setVelocityEach(0, 0)
  }

  

  spawnCoin();
  spawnEnergy();
  spawnBomb();

  drawSprites();
}

function spawnCoin(){
  if(frameCount % 150 === 0){
      coin = createSprite(700,0);
      coin.x = Math.round(random(50,300))
      coin.scale = 0.3
      coin.velocityY = 5
      coin.addImage("coin",coinImg);
      coin.lifetime = 220;
      coinGroup.add(coin);
  }
}

function spawnEnergy(){
  if(frameCount % 250  === 0){
      energy = createSprite(1000,0);
      energy .x = Math.round(random(50,300))
      energy .addImage("energy",energyImg);
      energy .scale = 0.1
      energy .velocityY = 4
      energy.lifetime = 200;
      energyGroup.add(energy);
      
  }
}

function spawnBomb(){
  if(frameCount % 200  === 0){
      bomb = createSprite(700,0);
      bomb .x = Math.round(random(50,300))
      bomb .addImage("bomb",bombImg);
      bomb .scale = 0.08;
      bomb .velocityY = 5
      bomb.lifetime = 220;
      bombGroup.add(bomb);
      bomb.debug = true;
  }
}
