# _Game System Framework_

This compilation of script are used to build HTML5 Canvas games. Develop your game quicker using the Game System Framework.

## _Introduction_

The Game System Framework was built to create HTML5 Canvas games quickly and not limit the type of game that can be built using it. The Game System Framework sets up basic logic patterns for collision detection a boundry detection, piece management, as well as sprite maping, and background display. Follow along to built your very own HTML5 canvas game.

### _Files_
`Board.js` 

  Used to create the game board and render the objects of the game.

```JavaScript
  var width = data.map.canvas.width;
  var height = data.map.canvas.height;
  var instance = new Board(
    {
      width,
      height,
      canvasId: "gameBoard",
    },
    gameboardHandler,
    moveHandler
  );

  ...

  instance.start();
```
The gameboardHandle and moveHandler are functions that allow the developer to update game application process and extend the game movement commands.

Crash Handler
The crash handler function is used to handle the logic of the game once an object has detected a crash event.

```JavaScript
instance.handleCrash = (player, obstacle) => {
  ...
}
```
Build logic that controls the gameplay.

`Piece.js`

Used to create game pieces with-in the game environment. This class is used to create player and obstacles instances.

Background Piece

```JavaScript
 var backgroundPiece = new Piece(
   "BaseBackground",
   instance,
   backgroundColor,
   {
      x: 5 + i,
      y: 5 + i,
      width: instance.coords.width - offsetX - 5 * 2,
      height: instance.coords.height - offsetY - 5 * 2,
    });
  instance.background = backgroundPiece;
  instance.background = background;
  //setup obstacles.
  instance.obstacles = [background[background.length - 1]];
```

Player Piece

```JavaScript
 var playerPiece = new Piece(
        player.id,
        instance,
        player.color,
        new Coords({ ...player.coords }).toObject()
      );
  playerPiece.isPlayerPiece = true;
  playerPiece.shouldReset = player.shouldRest;
  playerPiece.stats = new PlayerStats(playerPiece);
  playerPiece.inventory = new PlayerInventory(playerPiece);
  playerPiece.storage = new PlayerStorage(playerPiece);
  playerPiece.equipment = new PlayerEquipment(playerPiece);
  playerPiece.skills = new PlayerSkills(playerPiece);
  
  instance.setActivePlayer(playerPiece);
  instance.addPlayer(playerPiece);
  instance.players[playerPiece.id].update();
```

Obstacle Piece

```JavaScript
 var obstaclePiece = new Piece(...);
```


`GameEquipment.js`, `GameInventory.js`, `GameSkills.js`, `GameStats.js`, `GameStorage.js`

These files are designed to be extended by the game controller you will build. See <a href="#extend-game-classes">Extend Game Classes</a>

`Coords.js`

Used to manage the position of elements on the canvas.

```JavaScript
  var player = new Player(...);
  var position = new Coords({
    x : 0,
    y : 0,
    width: 0,
    height: 0
  })

  player.coords = position;
```

`Sprite.js`

Used to map sprite images for pieces of the gameboard.

```JavaScript
  var gamePieceImages = new Sprite(context, src, sourceCoords, destinationCoords);
```

`Canvas.js`

Used internally by the `Board.js` class to load or create the canvas element on the DOM.
  
 Note : This file is not used by the developer.


<a name="extend-game-classes"></a>
### Extend Classes
The classes that make up the body of a Piece are extendable. 

```JavaScript
class PlayerStorage extends GameStorage {
  ...
}
```

### Putting it all together.  ###
As you develop a game using the Game System Framework you are in control of how and what happens to the objects of the game. 


### Check out Harvester -- The Dawn -- ###
    (Main Game Server)
    (Git Project Files) 

See what you can build. 

### _Gist_ ###

https://url/link

From the creator :

    I created this in a coulpe weeks, while exploring building games with HTML5 Canvas. I wanted to create a simple game. Something that could be played without the need for an internet connection, as well as offer a way to allow others to create and share games. If you like it, want to help extend it, or just want to chat
    email me at :
    michaeladennis@yahoo.com
    I'll get back to you as soon as I can.

    dreamingrainbow
    Love(d) to be Love(d)
