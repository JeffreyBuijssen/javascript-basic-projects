const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// monts and days are 0 index based
//let futureDate = new Date(2024, 3, 23, 14, 28, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
//let futureDate = new Date();
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
const date = futureDate.getDate();

const amPM = hours < 12 ? "am" : "pm";

giveaway.textContent = `giveaway end on ${weekdays[futureDate.getDay()]} ${date} ${months[month]} ${year} ${hours}:${minutes}${amPM}`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t =  futureTime - today;
    // 1 s = 1000ms
    // 1 m = 60s = 60000 ms
    // 1hr = 60min
    // 1d = 24hr


    const oneSec = 1000; //ms
    const oneMin = 60 * oneSec; // in ms
    const oneHour = 60 * oneMin; // in ms
    const oneDay = 24 * oneHour; // in ms

    // calulate all values
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t%oneDay) / oneHour);
    let minutes = Math.floor((t%oneHour) / oneMin);
    let seconds = Math.floor((t%oneMin) / oneSec);
    
    function format(item) {
        if (item < 10) {
            return item = `0${item}`;
        }
        return item;
    }

    const values = [days, hours, minutes, seconds];
    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });
    if (t <= 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
    }
}
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();