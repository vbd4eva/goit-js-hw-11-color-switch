import colors from "./data/colors.js";

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const COLOR_SWITCH_INTERVAL = 1000;
let timerId;

const refs = {
    buttonStart: document.querySelector('[data-action="start"]'),
    buttonStop: document.querySelector('[data-action="stop"]'),
}

let currentColor = getRandomColor();

setBodyColor(currentColor);

refs.buttonStop.disabled = true;
   
refs.buttonStart.addEventListener('click', onClickButtonStart, {once: true});


function getRandomColor() {
    const min = 0;
    const max = colors.length - 1;

    const randomColor = colors[randomIntegerFromInterval(min, max)];

    return randomColor;
}

function changeCurrentColor() { 
    let color;

    do {
        color = getRandomColor();
    } while (color === currentColor);
    
    currentColor = color;
}
 
function setBodyColor(color){ 
    document.body.style.backgroundColor = color;
}

function switchBodyColor() { 

    changeCurrentColor();

    setBodyColor(currentColor);

    console.log(currentColor);
}

function onClickButtonStart() {     

    timerId = setInterval(switchBodyColor, COLOR_SWITCH_INTERVAL);
    
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;

    refs.buttonStop.addEventListener('click', onClickButtonStop, { once: true });
}

function onClickButtonStop() { 

    refs.buttonStop.disabled = true;
    clearInterval(timerId);    
    
    refs.buttonStart.disabled = false;
    refs.buttonStart.addEventListener('click', onClickButtonStart, {once: true});
}