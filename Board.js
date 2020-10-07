import { Coords, Piece, Canvas, Sprite } from "./";
export class Board {
  constructor(
    { width = 480, height = 270, canvasId },
    gameboardHandler,
    moveCallback
  ) {
    this.coords = new Coords({
      width,
      height,
    }).toObject();
    this._canvasId = canvasId;
    this.setGameboardHandler = gameboardHandler;
    this.players = {};
    this.move = moveCallback;
  }

  set setCrashHandler(value) {
    this.handleCrash = value.bind(this);
  }

  _background = [];
  get background() {
    return this._background;
  }
  set background(value) {
    this._background = value;
  }

  _obstacles = [];
  get obstacles() {
    return this._obstacles;
  }
  set obstacles(value) {
    this._obstacles = value;
  }

  _running = false;
  get running() {
    return this._running;
  }
  set running(value) {
    this._running = value;
  }

  get context() {
    return this._context;
  }
  set context(value) {
    this._context = value;
  }

  controllers() {
    var mouseOnBoard = false;
    var useMouseController = false;

    const up = () => {
      this.player.move({
        direction: "up",
      });
      this.renderBackground();
      this.renderPlayersAndObstacles();
      this.setGameboardHandler((state) => {
        const { player } = state;
        player.coords = this.player.coords;
        return { ...state, player };
      });
      this.move("up", this.player.coords);
    };

    const down = () => {
      this.player.move({
        direction: "down",
      });
      this.renderBackground();
      this.renderPlayersAndObstacles();
      this.setGameboardHandler((state) => {
        const { player } = state;
        player.coords = this.player.coords;
        return { ...state, player };
      });
      this.move("down", this.player.coords);
    };

    const left = () => {
      this.player.move({
        direction: "left",
      });
      this.renderBackground();
      this.renderPlayersAndObstacles();
      this.setGameboardHandler((state) => {
        const { player } = state;
        player.coords = this.player.coords;
        return { ...state, player };
      });
      this.move("left", this.player.coords);
    };

    const right = () => {
      this.player.move({
        direction: "right",
      });
      this.renderBackground();
      this.renderPlayersAndObstacles();
      this.setGameboardHandler((state) => {
        const { player } = state;
        player.coords = this.player.coords;
        return { ...state, player };
      });
      this.move("right", this.player.coords);
    };

    if (useMouseController) {
      this.canvas.addEventListener(
        "mousemove",
        (evt) => {
          var mousePos = this.getMousePos(evt);
          if (Piece.inside(mousePos, this.background[4])) {
            mouseOnBoard = true;
          } else {
            mouseOnBoard = false;
          }
          if (mouseOnBoard) {
            console.log("Mouse Moved to :", mousePos);
          }
        },
        false
      );
    }
    if (!document.test) {
      document.test = true;
      this.keydownHandler = (evt) => {
        evt.preventDefault();
        var codes = [
          "KeyW",
          "Numpad8",
          "ArrowUp",
          "KeyS",
          "Numpad2",
          "ArrowDown",
          "KeyA",
          "Numpad4",
          "ArrowLeft",
          "KeyD",
          "Numpad6",
          "ArrowRight",
        ];
        console.log(evt.code);
        if (codes.indexOf(evt.code) === -1) {
          return;
        }
        return {
          KeyW: up,
          Numpad8: up,
          ArrowUp: up,

          KeyS: down,
          Numpad2: down,
          ArrowDown: down,

          KeyA: left,
          Numpad4: left,
          ArrowLeft: left,

          KeyD: right,
          Numpad6: right,
          ArrowRight: right,
        }[evt.code]();
      };
      document.addEventListener("keydown", this.keydownHandler, false);
    }
    return {
      move: (direction) => {
        var directions = ["up", "down", "left", "right"];
        if (directions.indexOf(direction) === -1) return;
        const _move = {
          up: () => this.player.move({ direction: "up" }),
          down: () => this.player.move({ direction: "down" }),
          right: () => this.player.move({ direction: "right" }),
          left: () => this.player.move({ direction: "left" }),
        };
        _move[direction]();
        this.renderBackground();
        this.renderPlayersAndObstacles();
        this.setGameboardHandler((state) => {
          const { player } = state;
          player.coords = this.player.coords;
          return { ...state, player };
        });
        //this.move(direction, this.player.coords);
      },
    };
  }

  start() {
    this.running = true;
    if (this._canvasId) {
      //console.log("Setting Custom Canvas.");
      var canvasElement = document.getElementById(this._canvasId);
      this.canvas = new Canvas(canvasElement);
    } else {
      this.canvas = new Canvas();
      document.body.insertBefore(
        document.createElement("br"),
        document.body.childNodes[0]
      );
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
    this.canvas.style.display = "block";
    this.canvas.width = this.coords.width;
    this.canvas.height = this.coords.height;
    this.context = this.canvas.getContext("2d");

    var style = `canvas { border: 1px solid #d3d3d3; background-color: #f1f1f1; }`;

    var styleElement = document.createElement("style");
    styleElement.innerText = style;
    this.style = styleElement;
    document.body.insertBefore(
      this.style,
      document.body.childNodes[document.body.childNodes.length - 1]
    );
    this.clear();
    this.controllers();
    this.renderBackground();
    this.renderPlayersAndObstacles();
  }

  setActivePlayer(player) {
    this.player = player;
  }

  addPlayer(player) {
    this.players[player.id] = player;
  }

  removePlayer(player) {
    this.players[player.id].clear();
    delete this.players[player.id];
  }

  renderBackground() {
    return this.background.map((background) => {
      return background.update();
    });
  }

  getMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  clear() {
    var ctx = this.context;
    ctx.clearRect(
      this.coords.x,
      this.coords.y,
      this.coords.width,
      this.coords.height
    );
  }

  renderSprites(sprites) {
    sprites.forEach((sprite, i) => {
      this.sprites[sprite._id] = new Sprite(
        this.context,
        sprite.fileName,
        new Coords(sprite.imgCoords).toObject(),
        new Coords(sprite.posCoords).toObject()
      );
      this.sprites[sprite._id].update();
    });
  }

  renderPlayersAndObstacles() {
    this.obstacles.forEach((obstacle) => {
      if (this.player && this.player.crashWith(obstacle)) {
        return this.handleCrash(this.player, obstacle);
      } else {
        if (obstacle.alive) {
          obstacle.update();
        }
        Object.keys(this.players).forEach((playerId) => {
          if (this.players[playerId].alive) {
            if (this.recording && playerId === this.player.id) {
              this.player.history.push(this.player.coords);
            }
            this.players[playerId].update();
          }
        });
      }
    });
  }

  reset() {
    document.removeEventListener("keydown", this.keydownHandler);
    this.obstacles = [];
    this.players = {};
    this._running = false;
    this.clear();
    document.test = false;
  }
}
