console.log('numbers project');

const spans = document.querySelectorAll(".number");

spans.forEach(function (span) {
    updateCount(span);
});

function updateCount(el) {
    const maxValue = el.dataset.value;
    const increment = Math.ceil(maxValue / 1000);
    let currentValue = 0;

    const incrementCounter = setInterval(function () {
        currentValue += increment;
        if (currentValue > maxValue) {
            el.textContent = `${maxValue}+`;
            clearInterval(incrementCounter);
            return;
        }
        el.textContent = `${currentValue}+`;
    }, 1);
}