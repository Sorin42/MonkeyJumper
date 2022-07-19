var monkey,tree,jungle,gameover,parrot,parrotImg
var monkeyHanging,tree2Img,monkeyJumping,BackroundImg,gameoverImg,backround
var objectGroup, firstTreeHitbox, treeHitbox,monkeyHands,jumpTimer2,sloth,slothImg,animals
var gamestate = 1
var n = 4
var jumpTimer = 0
var doubleJumpTimer = 0
var monkeySide = 1
var jumpStatement, resetSprite, treeGroup, score
var highscore = 0

function preload (){
parrotImg = loadImage("Assets/parrot.png")

monkeyHanging = loadAnimation("Assets/monkeyHangingAnimation.gif")
monkeyJumping = loadImage("Assets/monkeyJumping.png")

treeImg = loadImage("Assets/tree1.png")
tree2Img = loadImage("Assets/tree2.png")

slothImg = loadImage("Assets/sloth.png")

BackroundImg = loadImage("Assets/Backround.jpg")
gameoverImg = loadImage("Assets/gameover.jpg")
}
function setup(){
    createCanvas(windowWidth/2,windowHeight)



backround = createSprite(width/2,height/2,40,40)
backround.addImage("backround",BackroundImg)
backround.scale = 1.6


monkey = createSprite(width/2,height-85,10,10)
monkey.scale = 0.3
monkey.addImage("jumping",monkeyJumping)
monkey.addAnimation("hanging",monkeyHanging)
monkeyHands = createSprite(monkey.x,monkey.y-60,60,10)
monkeyHands.visible = false

tree = createSprite(width/2-40,height-55,20,80)
tree.addImage("tree",treeImg)
tree.lifetime = 400

firstTreeHitbox = createSprite(width/2-20,height-105,90,30)
firstTreeHitbox.visible = false;
firstTreeHitbox.lifetime = 400

 
objectGroup = new Group()
objectGroup.add(firstTreeHitbox)

treeGroup = new Group(tree)
animals = new Group()


gameover = createSprite(width/2,height/2,20,20)
gameover.addImage("gameover",gameoverImg)
gameover.visible = false

resetSprite = createSprite(width*4/9, 4 /8 *height)
resetSprite.visible = false
resetSprite.depth = 100 





}
function draw(){
    
background(0, 100, 0)

if(score  >= highscore){
    highscore = score
    console.log(highscore)
}
score = Math.round((n-4)*3.34) 
if(gamestate === 1){
    text("you've climbed this many trees "+score,width-200,40)
monkeyHands = createSprite(monkey.x,monkey.y-60,60,10) 
monkeyHands.visible = false
//gameover.visible = false;
createTree()

firstJump ()
if(jumpStatement == 1){
jumpTimer += 1
}
if(monkey.y >= height+20){
    gamestate = 0
}
//console.log(gamestate)
}
if(gamestate === 0){
    console.log("end")
    gameover.scale =4.5
    gameover.visible = true
    gameover.depth = 10+n*3.34 
    treeGroup.destroyEach()
    monkeyHands.destroy()
    tree.destroy()
    monkey.destroy()
    animals.destroyEach()
    reset()

   //console.log(gameover.depth)
   
}


drawSprites()
if(gamestate == 0){

textSize(20)
stroke("blue")
fill("blue")

var gameovertext = text("Play Again?",4*width/9,5*height/10)
gameovertext.depth = gameover.depth+1

var highscoretext = text("High Score:"+highscore,4*width/9,4*height/10)
highscoretext.depth = gameovertext.depth
}
}

function createTree(){
    
    if(frameCount % (100) === 0){
    var treeSelector = Math.round(random(1,2))
    
    switch (treeSelector){

 case 1: var xcords = Math.round(random(60,width/2-40));
 var createdTree = createSprite(xcords,-100)
 createdTree.addImage("tree",treeImg)
 treeGroup.add(createdTree)
 treeHitbox = createSprite(xcords+10,createdTree.y-50,90,10)
 objectGroup.add(treeHitbox)
 treeHitbox.visible = false;
 if(Math.round(1,2)== 1){
     sloth = createSprite(createdTree.x-13 ,createdTree.y-20,10,10)
     sloth.addImage("sloth",slothImg )
     sloth.visible = true;
     console.log("sloth")
     sloth.velocityY = n
     sloth.scale = 0.3
     sloth.lifetime = (height+20)/n
     animals.add(sloth)
 }
 
 break;


 case 2: var xcords = Math.round(random(width/2+40,width-60));
 var createdTree = createSprite(xcords,-100)
 createdTree.addImage("tree",tree2Img)
 createdTree.scale = 2.5
 treeGroup.add(createdTree)
 treeHitbox = createSprite(xcords+10,createdTree.y-50,90,10)
 objectGroup.add(treeHitbox)
 treeHitbox.visible = false;
 if(Math.round(1,2)== 1){
    parrot = createSprite(createdTree.x+13 ,createdTree.y-20,10,10)
    parrot.addImage("parrot",parrotImg )
    parrot.visible = true;
    console.log("parrot")
    parrot.velocityY = n
    parrot.scale = 0.5
    parrot.lifetime = (height+20)/n
    animals.add(parrot)
}
 break;

    }
    
      createdTree.lifetime = (height+20)/n
      treeHitbox.lifetime = (height+60)/n
      createdTree.velocityY = n
      treeHitbox.velocityY = n
      n +=0.3
      console.log(n)
      console.log(score)
    }
   
}

 




function firstJump() {
if(objectGroup.isTouching(monkeyHands)|| firstTreeHitbox.isTouching(monkeyHands)){
    jumpTimer = 0
    monkey.changeImage("hanging",monkeyHanging)
    //console.log("touch")
    monkey.scale = 0.3
    doubleJumpTimer = 0

    if(monkey.velocityY < 0){

    }
    if(monkey.velocityY >=0){
        monkey.velocityY = n-2
    }
    
    monkey.velocityX = 0
    jumpTimer2 = 0
    jumpStatement = 0
        if(monkey.x <= width/2){
            monkeySide = 2
        }
        if(monkey.x > width/2){
            monkeySide = 1
        }
    
}
if(firstTreeHitbox.isTouching(monkeyHands)){
    monkey.velocityY = 0
}

else{
    monkey.changeImage("jumping",monkeyJumping)
    monkey.scale = 0.2
    monkey.velocityY += 0.4
    if(frameCount % 2 == 0){
    jumpTimer2 += 1
    }
}
if(objectGroup.isTouching(monkeyHands)){
  
}
else{
    monkey.velocityY += 0.3
    
}
if(jumpTimer<2 ){
    monkey.changeImage("hanging",monkeyHanging)
    monkey.scale = 0.3 
}
if(keyDown("space")& jumpTimer < 6 &jumpTimer2 <=20 ){
    if(monkeySide == 1){
    monkey.velocityX = -6
    monkey.velocityY = -15
    jumpStatement = 1
    //console.log(jumpTimer)
    }
    if(monkeySide == 2){
        monkey.velocityX = 3
        monkey.velocityY  = -15 
        jumpStatement = 1 
    }
}
else 
    {
    if(doubleJumpTimer != 1) {
    if(monkey.velocityX != 0)
    if(keyDown("up")){
        monkey.velocityY = -15
        monkey.velocityX = monkey.velocityX *-1
        doubleJumpTimer = 1
}
    }
}




}
function reset() {
    if(mousePressedOver(resetSprite )){
  
    gamestate = 1
    n = 4
    // basically repeating setup except for groups and sprites that weren't destroyed
monkey = createSprite(width/2,height-85,10,10)
monkey.scale = 0.3
monkey.addImage("jumping",monkeyJumping)
monkey.addAnimation("hanging",monkeyHanging)
monkey.velocityY = 0

tree = createSprite(width/2-40,height-55,20,80)
tree.addImage("tree",treeImg)
tree.lifetime = 400

firstTreeHitbox = createSprite(width/2-20,height-105,100,30)
firstTreeHitbox.visible = false
firstTreeHitbox.lifetime = 400
objectGroup.add(firstTreeHitbox)

gameover.visible = false

}


}
