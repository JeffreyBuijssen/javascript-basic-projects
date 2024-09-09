
/**
 * This display class contains the screen resize event handler and also handles
 * drawing colors to the buffer and then to the display
 */
const Display = function (canvas) {

    this.buffer = document.createElement('canvas').getContext('2d');
    this.context = canvas.getContext('2d');
    this.tileSheet = new Display.TileSheet(16, 8);

    this.drawMap = function (map, columns) {
        
        for (let index = map.length - 1; index > -1; --index) {
            
            let value = map[index] - 1;
            let sourceX = (value % this.tileSheet.columns) * this.tileSheet.tileSize;
            let sourceY = Math.floor(value / this.tileSheet.columns) * this.tileSheet.tileSize;
            let destinationX = (index % columns) * this.tileSheet.tileSize;
            let destinationY = Math.floor(index / columns) * this.tileSheet.tileSize;

            this.buffer.drawImage(
                this.tileSheet.image, sourceX, sourceY, this.tileSheet.tileSize, this.tileSheet.tileSize,
                destinationX, destinationY, this.tileSheet.tileSize, this.tileSheet.tileSize);
        }
    };

    this.drawPlayer = function (rectangle, color1, color2) {
        this.drawRectangle(rectangle.x, rectangle.y, rectangle.width, rectangle.height, color1);
        this.drawRectangle(rectangle.x + 2, rectangle.y + 2, rectangle.width - 4, rectangle.height - 4, color2);
    };

    this.drawRectangle = function (x, y, width, height, color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };
    this.resize = function (width, height, aspectRatio) {
        if (height / width > aspectRatio) {
            this.context.canvas.height = width * aspectRatio;
            this.context.canvas.width = width;
        } else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / aspectRatio;
        }
        this.context.imageSmoothingEnabled = false;
    };
    // a function that resizes the canvas when the browser window is resized.
    // calculates new width and height, adjusts canvas then calls this.render()

    // subscribe to the resize event
    this.handeResize = (event) => this.resize();
};

Display.prototype = {
    constructor: Display,

    // a function that renders the game to the screen
    // -> renders buffer canvas to actual canvas.
    render: function () {
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
    },
};

Display.TileSheet = function (tileSize, columns) {
    this.image = new Image();
    this.tileSize = tileSize;
    this.columns = columns;
};

/*class TileSheet {
    image = undefined;
    tileSize = 0;
    columns = 0;

    constructor(tileSize, columns) {
        this.image = new Image();
        this.tileSize = tileSize;
        this.columns = columns;
    }
}
*/