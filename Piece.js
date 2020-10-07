import { Coords } from "./Coords";
import { GameStats } from "./GameStats";
import { GameInventory } from "./GameInventory";
import { GameStorage } from "./GameStorage";
import { GameSkills } from "./GameSkills";
import { GameEquipment } from "./GameEquipment";

export class Piece {
  constructor(
    pieceId,
    GameInstance,
    color,
    coords,
    hasInterval = false,
    intervalTimeSeq,
    callback = () => {
      return false;
    }
  ) {
    this._id = pieceId;
    this.game = GameInstance;
    this._color = color;
    this._coords = new Coords(coords).toObject();
    this._origPos = new Coords(coords).toObject();
    this._lastPos = new Coords(coords).toObject();
    this._hasInterval = hasInterval;
    this._state = false;
    this._intervalTimeSeq = intervalTimeSeq;
    this._shouldReset = false;
    this._alive = true;
    this._shouldDie = true;
    this._type = "piece";
    this._text = "Start";
    this._callback = callback;
  }
  _callback = () => {
    console.log("Default Callback Ran.");
    return;
  };
  get callback() {
    return this._callback;
  }
  set callback(value) {
    this._callback = value;
  }
  _id;
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  _stats;
  get stats() {
    return this._stats;
  }
  set stats(value) {
    if (!value instanceof GameStats) {
      this._stats = new GameStats(value);
    } else this._stats = value;
  }

  _inventory;
  get inventory() {
    return this._inventory;
  }
  set inventory(value) {
    if (!value instanceof GameInventory) {
      this._inventory = new GameInventory(value);
    } else this._inventory = value;
  }

  _storage;
  get storage() {
    return this._storage;
  }
  set storage(value) {
    if (!value instanceof GameStorage) {
      this._storage = new GameStorage(value);
    } else this._storage = value;
  }

  _skills;
  get skills() {
    return this._skills;
  }
  set skills(value) {
    if (!value instanceof GameSkills) {
      this._skills = new GameSkills(value);
    } else this._skills = value;
  }

  _equipment;
  get equipment() {
    return this._equipment;
  }
  set equipment(value) {
    if (!value instanceof GameEquipment) {
      this._equipment = new GameEquipment(value);
    } else this._equipment = value;
  }

  _history = [];
  get history() {
    return this._history;
  }

  set history(value) {
    this._history.push(value);
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get alive() {
    return this._alive;
  }

  set alive(value) {
    this._alive = value;
  }

  get shouldDie() {
    return this._shouldDie;
  }

  set shouldDie(value) {
    this._shouldDie = value;
  }

  _isPlayerPiece = false;
  get isPlayerPiece() {
    return this._isPlayerPiece;
  }
  set isPlayerPiece(value) {
    this._isPlayerPiece = value;
  }

  _color;
  get color() {
    return this._color;
  }
  set color(value) {
    this._color = value;
  }

  _coords = new Coords();
  get coords() {
    return this._coords;
  }
  set coords(elements) {
    if (!this._coords instanceof Coords) {
      this._coords = new Coords({
        ...elements,
      }).toObject();
    }
  }

  get lastPos() {
    return this._lastPos;
  }
  set lastPos(elements) {
    if (!this._lastPos instanceof Coords) {
      this._lastPos = new Coords({
        ...elements,
      }).toObject();
    } else this._lastPos = elements;
  }

  get origPos() {
    return this._origPos;
  }
  set origPos(elements) {
    if (!this._origPos instanceof Coords) {
      this._origPos = new Coords({
        ...elements,
      }).toObject();
    } else this._origPos = elements;
  }

  get shouldReset() {
    return this._shouldReset;
  }
  set shouldReset(value) {
    this._shouldReset = value;
  }

  _collisionType = "out";
  get collisionType() {
    return this._collisionType;
  }
  set collisionType(value) {
    this._collisionType = value;
  }

  crashWith(otherobj) {
    var gamePieceLeft = this.coords.x;
    var gamePieceRight = this.coords.x + this.coords.width;
    var gamePieceTop = this.coords.y;
    var gamePieceBottom = this.coords.y + this.coords.height;
    var otherLeft = otherobj.coords.x;
    var otherRight = otherobj.coords.x + otherobj.coords.width;
    var otherTop = otherobj.coords.y;
    var otherBottom = otherobj.coords.y + otherobj.coords.height;
    if (otherobj._collisionType === "out") {
      if (
        gamePieceRight > otherLeft &&
        gamePieceLeft < otherRight &&
        gamePieceBottom > otherTop &&
        gamePieceTop < otherBottom
      )
        return true;
    } else if (otherobj._collisionType === "in") {
      if (
        gamePieceLeft < otherLeft &&
        gamePieceRight > otherRight &&
        gamePieceTop < otherTop &&
        gamePieceBottom > otherBottom
      ) {
        return true;
      }
    }
    
    return false;
  }

  update() {
    if (this.type === "text") {
      this.game.context.font = this.coords.width + " " + this.coords.height;
      this.game.context.fillStyle = this.color;
      this.game.context.fillText(this.text, this.coords.x, this.coords.y);
    } else {
      this.game.context.fillStyle = this.color;
      this.game.context.fillRect(
        this.coords.x,
        this.coords.y,
        this.coords.width,
        this.coords.height
      );
    }

    if (this._hasInterval) {
      this.intervalFn(this.callback);
    }
  }

  intervalFn(
    cb = () => {
      return;
    }
  ) {
    this._interval = setTimeout(() => {
      if (this._state) {
        this._state = false;
        this.clear();
        clearTimeout(this._interval);
        this.intervalFn(cb);
      } else {
        this._state = true;
        this.update();
        this.intervalFn(cb);
      }
      cb(this);
      //console.log(this._coords.x, this._coords.y)
    }, this._intervalTimeSeq);
  }

  move({ direction, coords }) {
    const _move = {
      up: () => {
        if (coords) {
          const { x, y, width, height } = coords;
          this._coords.x = x;
          this._coords.y = y;
          this._coords.width = width;
          this._coords.height = height;
        } else {
          this._coords.y -= 1;
        }
      },
      down: () => {
        if (coords) {
          const { x, y, width, height } = coords;
          this._coords.x = x;
          this._coords.y = y;
          this._coords.width = width;
          this._coords.height = height;
        } else {
          this._coords.y += 1;
        }
      },
      right: () => {
        if (coords) {
          const { x, y, width, height } = coords;
          this._coords.x = x;
          this._coords.y = y;
          this._coords.width = width;
          this._coords.height = height;
        } else {
          this._coords.x += 1;
        }
      },
      left: () => {
        if (coords) {
          const { x, y, width, height } = coords;
          this._coords.x = x;
          this._coords.y = y;
          this._coords.width = width;
          this._coords.height = height;
        } else {
          this._coords.x -= 1;
        }
      },
    }[direction];
    this.lastPos = new Coords(this.coords);
    _move();
  }

  clear() {
    this.game.context.clearRect(
      this.coords.x,
      this.coords.y,
      this.coords.width,
      this.coords.height
    );
  }

  static inside(mouseCoords, obstacle) {
    if (!obstacle instanceof Piece) return false;
    var obstacleTop = obstacle.coords.y;
    var obstacleBottom = obstacle.coords.y + obstacle.coords.height;
    var obstacleLeft = obstacle.coords.x;
    var obstacleRight = obstacle.coords.x + obstacle.coords.width;
    if (
      mouseCoords.x > obstacleLeft &&
      mouseCoords.x < obstacleRight &&
      mouseCoords.y > obstacleTop &&
      mouseCoords.y < obstacleBottom
    ) {
      return true;
    }
    return false;
  }
  
  toObject() {
    return {
      id: this._id,
      coords: this._coords,
      stats: this._stats,
    };
  }
}
