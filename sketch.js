var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedDog;

//create feed and lastFed variable here
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("Feed the Dog");
  feedDog.position(600,95);
  feedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  function readFedTime(data){
    var readFedTime=database.ref('FeedTime');
    readFedTime.on("value", function(data){
      readFedTime=data.val();
    })
    
  }

 

//write code to display text lastFed time here
  if(lastFed>=12){
    text("", 350, 350);
  }
 else if(lastFed==0){
   text("Last Feed : 12 AM", 350, 350);
 }
 else{
  text("", 350, 350);
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    fooObj.updateFoodStock(food_stock_val -1);
  }

  //write code here to update food stock and last fed time
    function upateStock(data){
      database.ref('food').update({
        Food: foodS
      })
    }

    function updateLastFed(data){
      database.ref('FeedTime').update({
        FeedTime: lastFed
      })
    }
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


