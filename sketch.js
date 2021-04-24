var hypnoticBall,database,position,hbPosition,balloon,bg;
function preload()
{
  balloon = loadImage("hotairballoon1.png");
  bg = loadImage("cityImage.png");
}
function setup(){
    database = firebase.database();

    createCanvas(1200,600);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.addImage(balloon);
    hypnoticBall.scale = 0.4;
    hbPosition = database.ref('ball/position');
    hbPosition.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
    'x':position.x + x,
    'y':position.y + y
    })
}
function readPosition(data)
{
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}
function showError()
{
    console.log("error in database")
}