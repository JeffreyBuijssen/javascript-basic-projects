

// take user input from keyboard and show the user which key they keyDown.

const Controller = function () {

    // this.down = new Controller.ButtonInput();
    this.left = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up = new Controller.ButtonInput();
    // reference to button input for down, left, right & up
    this.keyDownUp = function (eventType, keyCode) {
        let keyDown = eventType == 'keydown' ? true : false;
        // letter keys:65 (a) + n^th letter of the alphabet - 1;
        // Movement keys:
        // up: upArrow = 38, w = 87, space = 32
        // left: leftArrow = 37, a = 65
        // right: rightArrow = 39, d = 68
        // down: downArrow = 40, s = 83

        console.log('keyDownUp has been called');
        // Check if pressed key is a movement key
        switch (keyCode) {
            case 37: case 65:
                this.left.getInput(keyDown); break;
            case 38: case 87: case 32:
                this.up.getInput(keyDown); break;
            case 39: case 68:
                this.right.getInput(keyDown); break;
            //case 40: case 83:
            //   this..down.getInput(keyDown);
        }

        //alert(`You keyDown a key (${keyCode})!`);
    }
}

Controller.prototype = {
    constructor: Controller,
};

Controller.ButtonInput = function () {
    this.active = this.keyDown = false;
};

Controller.ButtonInput.prototype = {
    constructor: Controller.ButtonInput,

    getInput: function (keyDown) {
        if (this.keyDown != keyDown) this.active = keyDown;
        this.keyDown = keyDown;
    }
}

