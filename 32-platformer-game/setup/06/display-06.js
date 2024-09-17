
/**
 * This display class contains the screen resize event handler and also handles
 * drawing colors to the buffer and then to the display
 */
const Display = function (canvas) {

    this.buffer = document.createElement('canvas').getContext('2d');
    this.context = canvas.getContext('2d');

    this.drawMap = function (image, imageColumns, map, columns, tileSize) {

        for (let index = map.length - 1; index > -1; --index) {

            let value = map[index];
            let sourceX =                (value % imageColumns) * tileSize;
            let sourceY =      Math.floor(value / imageColumns) * tileSize;
            let destinationX =           (index % columns) * tileSize;
            let destinationY = Math.floor(index / columns) * tileSize;

            this.buffer.drawImage(
                image,
                sourceX,
                sourceY,
                tileSize,
                tileSize,
                destinationX,
                destinationY,
                tileSize,
                tileSize);
        }
    };

    this.drawObject = function (image, sourceX, sourceY, destinationX, destinationY, width, height) {
        this.buffer.drawImage(
            image,
            sourceX,
            sourceY,
            width,
            height,
            Math.round(destinationX),
            Math.round(destinationY),
            width,
            height
        );

        
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
    //this.handeResize = (event) => this.resize();
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


