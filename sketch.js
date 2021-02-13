const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world;
var position = {x:0,y:0};
var messy;
var pipeList = [];
var MessyImg, backgroundImg, background2, backgroundShift, grass, pipe;
var points = 0;
var gameState = "play";

function preload(){
  MessyImg = loadImage("innocentMessy.jpg");
  backgroundImg = loadImage("background1.jpg");
  grass = loadImage("grass1.png");
  background2 = loadImage("background2.png");
  pipe = loadImage("pipe.png");
  backgroundShift = 800;
}
function setup() {
  engine = Engine.create();
  world = engine.world;

  world.gravity.scale = 0.0003

  angleMode(DEGREES);
  createCanvas(800,400);
  imageMode(CENTER);

  messy = new Messy(200,200); 
  
  
  Engine.run(engine);
}

function draw() {
  background(0);
  if(getBackgroundImg){
  image(backgroundImg,backgroundShift,200,1600,400);
  }else{
  image(background2,400,200,800,400);
  image(grass,backgroundShift,200,1600,400);
  }
  if(gameState === "play"){
  backgroundShift -= 5;
  if(backgroundShift < 1){
    backgroundShift = 800;
  }

  text("points: "+points,400,50);

  
  
  
  
  createPipes();

if(pipeList.length > 0 && pipeList[0].body !== undefined){
  if(messy.body.position.x >= pipeList[0].body.position.x && messy.body.position.x < pipeList[0].body.position.x+5){
    points++;
  }
}
if(pipeList.length > 0){
  if(pipeList[0].body === undefined){
    pipeList.shift();
  }
}


  
  }
  if(messy.body.position.x < 0 || messy.body.position.y < 0 || messy.body.position.y > 400){
  gameState = "end";
  }

  for(var i = 0; i < pipeList.length; i++){
    pipeList[i].display();
  }

  messy.display();
  Engine.update(engine);
}
function keyPressed(){
  if(keyCode = 32){
    Matter.Body.setVelocity(messy.body,{x:0,y:-4});
  }
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1900){
      return true;
  }
  else{
      return false;
  }
}

function createPipes(){
  if(frameCount % 60 === 0){
    var rand = Math.round(random(-120,200))
    var pipe1 = new Pipe(-300+rand,-1);
    var pipe2 = new Pipe(200+rand,1);
    pipeList.push(pipe1);
    pipeList.push(pipe2);
  }
}