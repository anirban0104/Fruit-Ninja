
var play = 1
var end = 0
var gameState = 1

//fruits and obstacles


var sword
var fruit
var enemy1
var fruitGroup
var enemyGroup
var score
var r
var randomFruit
var position
var swordImage
var fruit1
var fruit2
var fruit3
var fruit4
var monsterImage
var gameOverImage
var gameOverSound
var knifeSwoosh

function preload() {

  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {

  createCanvas(600, 600)
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7
  //sword.debug=true


  //set collider for sword
  //console.debug(sword)
  sword.setCollider("rectangle", 0, 0, 95, 100);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();

}

function draw() {
  background("lightblue");
 

  if (gameState === play) {

    //make fruits and enemy function display 
    fruits();
    Enemy();

    // Move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    // Increase score if sword is touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();

      knifeSwooshSound.play();
      score = score + 1;}

     else {
       
       
      // Go to end state if sword touching enemy
      if (enemyGroup.isTouching(sword)) {
        gameState = end;
        //gameover sound
        gameOverSound.play()

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        //change the image of sword to gameOver image so we dont have to create another sprite
        
        sword.addImage(gameOverImage);
        sword.scale = 3
        sword.x = 300;
        sword.y = 300;
      }
    }
  }

  drawSprites();

  //Display score
  fill("red")
  textSize(20)
  text("Fruits slashed : " + score, 440, 30);
}


function Enemy() {
  
  
  if (World.frameCount % 150 === 0) {
    enemy1 = createSprite(600, 200, 20, 20);
    enemy1.addAnimation("enemy12", monsterImage);
    enemy1.x = Math.round(random(600, 601))
    enemy1.y = Math.round(random(0, 600));
    enemy1.velocityX = -15
    enemy1.setLifetime = 100;

    enemyGroup.add(enemy1);
  }
}

function fruits() {


  if (World.frameCount % 60 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(600, 200, 20, 20);
    // console.log(position)

    
    
//makining a variable to store variable positions, so it will spawn anywhere on screen


    if (position === 1) {

      fruit.x = Math.round(random(10, 590));
      fruit.velocityX = 10;
      //console.log(fruit.velocity)
    }

    fruit.scale = 0.2;
    
    
    
    //fruit.debug=true;
    
    
    //here r means 4 random no.s for any fruit to spawn
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(10, 590));
    //fruit.x = Math.round(random(0,600))

    fruit.velocityX = -10;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}