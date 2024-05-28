//using selectors inside the element
// traversing the dom

const buttons = document.querySelectorAll(".question-btn");
const questions = document.querySelectorAll(".question");

// Using DOM walk through
/*buttons.forEach(function (item) {
    item.addEventListener("click", function (e) {
        const currentQuestion = e.currentTarget.parentElement.parentElement;

        questions.forEach(function (question) {
            if (question !== currentQuestion) {
                question.classList.remove("show-text");
            } else {
                currentQuestion.classList.toggle("show-text");
            }
        });
    });
});
*/

// looping through all questions
questions.forEach(function (question) {
    const btn = question.querySelector(".question-btn");
    btn.addEventListener("click", function () {
        questions.forEach(function (item) {
            console.log(item !== question);
            if (item !== question) item.classList.remove("show-text");
        });
        question.classList.toggle("show-text");
    });
});