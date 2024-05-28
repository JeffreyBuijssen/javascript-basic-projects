function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    }
    throw new Error(
        `Please check "${selection}" selector, no such element exists`
    );
}

class Counter {
    constructor(element, value) {
        this.counter = element;
        this.value = value;

        this.decreaseBtn = this.counter.querySelector(".decrease");
        this.increaseBtn = this.counter.querySelector(".increase");
        this.resetBtn = this.counter.querySelector(".reset");

        // this.counter and element are interchangeable
        this.valueDOM = this.counter.querySelector(".value");
        this.valueDOM.textContent = this.value;

        this.increase = this.increase.bind(this);
        this.reset = this.reset.bind(this);
        this.decrease = this.decrease.bind(this);

        this.decreaseBtn.addEventListener("click", this.decrease);
        this.resetBtn.addEventListener("click", this.reset);
        this.increaseBtn.addEventListener("click", this.increase);
    }

    increase() {
        this.value++;
        this.valueDOM.textContent = this.value;
    }
    decrease() {
        this.value--;
        this.valueDOM.textContent = this.value;
    }
    reset() {
        this.value = 0;
        this.valueDOM.textContent = this.value;
    }
}

const firstCounter = new Counter(getElement(".first-counter"), 100);
const secondCounter = new Counter(getElement(".second-counter"), 200);
