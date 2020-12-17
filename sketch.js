var monkey, monkey_running, monkey_jumping;
var jumping;
var banana, bananaImage, fruit, fruitImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var x, y;
var background;
var survivalTime = 0;
var score;
var gameover, restart;
var r, g, a;
var gameState = 0;

function preload() {


  monkey_running = loadAnimation("Run1.png", "Run2.png", "Run3.png", "Run4.png", "Run5.png", "Run6.png", "Run7.png");
  monkey_jumping = loadAnimation("Jump1.png", "Jump2.png", "Jump3.png", "Jump4.png", "Jump5.png", "Jump6.png", "Jump7.png");

  bananaImage = loadImage("banana.png");
  fruitImage = loadImage("strawberry.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("1c000e4b52385061590d3a4ed12afcdf.jpg");
  gameOverImage = loadImage("game over.png");
  restartImage = loadImage("012_restart-2-512.webp");

}



function setup() {
  createCanvas(650, 400);

  monkey = createSprite(80, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("jumping", monkey_jumping);
  monkey.scale = 0.6;
  //monkey.debug = true;
  monkey.setCollider("circle", 0, 0, 40);

  r = createSprite(300, 290, 10, 10);
  r.addImage(restartImage);
  r.scale = 0.3;
  r.visible = false;

  g = createSprite(300, 130, 10, 10);
  g.addImage(gameOverImage);
  g.scale = 0.5;
  g.visible = false;


  ground = createSprite(650 / 2, 350, 650, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  ground.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  fruitGroup = new Group();

  score = 0;
  x = 0;
  y = width;


}


function draw() {
  background(backgroundImage);

  if (gameState == 0) {

    y = y + 1;
    x = x + 1;
    if (x >= width) {
      x = -width;
    }
    if (y >= width) {
      y = -width;
    }


    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }


    if (keyWentDown("space") && monkey.y >= 200) {
      monkey.velocityY = -15;
    }

    monkey.velocityY += 0.5;

    bananaFood();
    ob();
    food();

    if (bananaGroup.overlap(monkey, callBack)) {
      score = score + 1;
      //bananaGroup.destroyEach(); 
    }
    if (fruitGroup.overlap(monkey, callBack)) {
      score = score + 2;
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = 1;
    }
    if (frameCount % 60 == 0) {
      survivalTime = survivalTime + 1;
    }


  } else if (gameState == 1) {

    survivalTime = 0;
    score = 0;
    monkey.velocityY = 0;
    obstacleGroup.destroyEach();
    fruitGroup.destroyEach();
    bananaGroup.destroyEach();
    g.visible = true;
    r.visible = true;
    monkey.visible = false;

    if (mousePressedOver(r)) {
      g.visible = false;
      r.visible = false;
      monkey.visible = true;

      score = 0;
      survivalTime = 0;
      gameState = 0;
    }


  }

  monkey.collide(ground);

  image(backgroundImage, x, 0, width, height);
  image(backgroundImage, y, 0, width, height);





  stroke("red");
  textSize(20);
  fill("red");
  text("Score:   " + score, 500, 30);


  stroke("red");
  textSize(20);
  fill("red");
  text("Survival Time:   " + survivalTime, 90, 30);


  stroke("white");
  textSize(20);
  fill("blue");
  text("Press SpaceBar To Jump", 255, 40);


  drawSprites();
}

function bananaFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(100, 200)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = width;
    banana.rotationSpeed = 3;

    bananaGroup.add(banana);
  }
}

function food() {

  if (frameCount % 150 === 0) {
    fruit = createSprite(600, Math.round(random(100, 250)), 10, 10);
    fruit.addImage(fruitImage);
    fruit.scale = 0.2;
    fruit.velocityX = -3;
    fruit.lifetime = width;
    fruit.rotationSpeed = 3;

    fruitGroup.add(fruit);

  }
}

function ob() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 350, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;

    obstacle.lifetime = width;

    obstacleGroup.add(obstacle);
  }
}

function end() {


}

function callBack(sprite1, sprite2) {
  sprite1.remove();
}
 