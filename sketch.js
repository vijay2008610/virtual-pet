var dog,dogImg,happyDogImg,database,foodS,foodStock;


function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(350,350,30,40);
  dog.addImage("dog",dogImg);
  dog.scale = 0.2;
}


function draw() {  
background(46, 139, 87);

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}
  drawSprites();
  textSize(20);
  fill("green");
  text("PRESS UP ARROW KEY TO FEED THE DOG",20,30);
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
if (x<=0){
  x = 0;
}
else{
  x = x-1;
}
database.ref('/').update({
  Food:x
});
}
