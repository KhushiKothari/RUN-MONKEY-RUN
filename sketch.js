var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_co  = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 // createCanvas(600, 600);
  


    
  //creating monkey
   monkey=createSprite(60,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.09;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstacleGroup = new Group(); 
  
}


function draw() {
  
  background(255);
  
  
  if(ground.x<0) {
    ground.x=ground.width/2;
     }
  
  monkey.collide(ground);
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ score, 100,50);
  
  
   if (gameState === PLAY) {
     
  
  if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
      
  }
    monkey.velocityY = monkey.velocityY + 0.8;
         
   spawnFood();
   spawnObstacles();
   
  if (FoodGroup.isTouching(monkey)) {
   FoodGroup.visible = false; 
    
  }
     
  if (obstacleGroup.isTouching(monkey)) {
  gameState = END;
  }
  

  score=Math.ceil(frameCount/frameRate()) 
  
  

}
  else if(gameState === END) {
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    
    
    //monkey.changeAnimation("collided", monkey_ );
  }
 
  
  
  drawSprites();
  
  
  
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 165, 10, 40);
     banana.y = Math.round(random(250, 320));
     banana.addImage(bananaImage);
     banana.scale = 0.09;
     banana.velocityX = -3;
    
    //to add lifetime to the banana
     banana.lifetime = 200;
    
    
     FoodGroup.add(banana);
    
  }
}

function spawnObstacles() {
  // write code here to spawn obtsacles
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,330,10,40);
   obstacle.velocityX = -3
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    
  obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
  }
}
