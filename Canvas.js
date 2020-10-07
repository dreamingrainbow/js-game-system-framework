export class Canvas {
  constructor(canvasElement) {
    if(canvasElement) {
      this.canvas = canvasElement;
    } else
    this.canvas = document.createElement("canvas");
    return this.canvas;
  }
}
