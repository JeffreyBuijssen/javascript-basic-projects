
/**
 * This display class contains the screen resize event handler and also handles
 * drawing colors to the buffer and then to the display
 */
const Display = function (canvas) {

    this.buffer = document.createElement('canvas').getContext('2d');
    this.context = canvas.getContext('2d');
    // add and create a buffer canvas to the document
    // reference to the context of the provided canvas (in constructor parameter)


    this.preDraw = function (backgroundColor, gameObjects) {
        this.drawBackground(backgroundColor);
        gameObjects.forEach(obj => this.drawObject(obj));
    };

    // a function, accepting a color, that sets the buffer to the provided color
    // and then renders the buffer on the real canvas
    this.drawBackground = function (color) {
        //console.log(color);
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };

    this.drawObject = function (gameObject) {
        this.buffer.fillStyle = gameObject.color;
        this.buffer.fillRect(gameObject.x,
            gameObject.y,
            gameObject.width,
            gameObject.height
        );
    };

    // a function that renders the game to the screen
    // -> renders buffer canvas to actual canvas.
    this.render = function () {
        this.context.drawImage(
            this.buffer.canvas,
            0,
            0,
            this.buffer.canvas.width,
            this.buffer.canvas.height,
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        );
    };

    this.resize = function (event) {
        let height, width;

        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;

        this.context.canvas.height = height - 32;
        this.context.canvas.width = width - 32;

        this.render();
    };
    // a function that resizes the canvas when the browser window is resized.
    // calculates new width and height, adjusts canvas then calls this.render()

    // subscribe to the resize event
    this.handeResize = (event) => this.resize();

};

Display.prototype = {
    constructor: Display,
};
