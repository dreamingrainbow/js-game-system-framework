import {Coords} from "./";
export class Sprite {
  constructor(
    context,
    src = "herbs-sprite.jpg",
    sourceCoords = new Coords().toObject(),
    destinationCoords = new Coords().toObject()
  ) {
    this.context = context;
    this.src = src;
    this.imageObj = new Image(sourceCoords.width, sourceCoords.height);
    this.sourceX = sourceCoords.x;
    this.sourceY = sourceCoords.y;
    this.sourceWidth = sourceCoords.width;
    this.sourceHeight = sourceCoords.height;
    this.destX = destinationCoords.x;
    this.destY = destinationCoords.y;
    this.destWidth = destinationCoords.width;
    this.destHeight = destinationCoords.height;
    this.imageObj.src = this.src;

    this.imageObj.onload = (s) => {
      this.context.drawImage(
        this.imageObj,
        this.sourceX,
        this.sourceY,
        this.sourceWidth,
        this.sourceHeight,
        this.destX,
        this.destY,
        this.destWidth,
        this.destHeight
      );
    };

    this.imageObj.onerror = (err) => {
      console.log(err);
    };
  }
  update() {}
}
