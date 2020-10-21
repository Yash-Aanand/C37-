class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    Car1 = createSprite(100,200);
    Car2 = createSprite(300,200);
    Car3 = createSprite(500,200);
    Car4 = createSprite(700,200);
    Cars = [Car1,Car2,Car3,Car4];
  }

  play(){ 
    form.hide();  
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = 130;
      var index = 0;
      var X = 0;
      var Y;      
      for(var plr in allPlayers){
      index = index+1;
      X = X+200;
      Y = displayHeight - allplayers[plr].distance;
      Cars[index-1].x = X;
      Cars[index-1].y = Y;
      if(index === player.index){
        //if numbers match:
        Cars[index-1].shapeColor = "red";
        camera.position.x = displayWidth/2;
        camera.position.y = Cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
