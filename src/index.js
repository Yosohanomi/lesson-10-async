// SetTimeout - 1 раз через вказаний час (delay)

// setTimeout((a)=> {
//     alert("test time out " + a)
//     console.log(a);
// }, 500, "argument"
// );

// const x = 2;
// console.log(x);
// const y = 5;
// console.log(y);

// setTimeout(() => {
//     console.log("Другий SetTimeout");
// }, 2000);

// в коді першим виконується синхронний, а після - асинхронний.
// Якщо є кілька асин. операцій, то вони виконаються в порядку хто швидше спрацював. Залежить від часу затримки (delay)

// SetInterval - повторює код через вказаний час (delay) - clearInterval is stopping it.
// let count = 0
// const id = setInterval(() => {
//     count ++
//     console.log(`Пройшло секунд: ${count}`);
//     if (count === 5) {
//         clearInterval(id)
//     }
// }, 1000)

// let num = 0;
// setTimeout(() => alert(num), 100); // ?
// припустимо, що час виконання цієї функції > 100 мс
// for(let i = 0; i < 100000000; i += 1) {
//   num+=1;
// }

// SetTimeout - після циклу
// alert will show undefined (let - блочна зона видимості)

// 2
// const startBtn = document.getElementById("start");
// const endBtn = document.getElementById("end");
// const counter = document.getElementById("counter");

// startBtn.addEventListener("click", ()=> {
//     let count = 0;
//     counter.innerHTML= count
//     setInterval(()=> {
//         count +=1;
//         // counter.textContent = count;
//         counter.innerHTML= count
//     }, 1000);
// })

// endBtn.addEventListener(()=> {
//     clearInterval(id)
// })

// Завдання "Зміна кольору": Створіть блок, який змінює свій фоновий колір кожні 3 секунди. Використовуйте setInterval для зміни кольору.

// const element = document.querySelector("#change-color");
// const colors = ['#fff', '#000', '#FF5733', '#FF5600'];

// let currentColor = 0;
// setInterval(()=> {
//     element.style.backgroundColor = colors[currentColor];
//     currentColor = (currentColor + 1) % colors.length;
// }, 3000)

// setInterval(() => {
//     const red = (Math.random() * 256)
//     const green = (Math.random() * 256)
//     const blue = (Math.random() * 256)
//     const color = `rgb(${red}, ${green}, ${blue})`
//     element.style.backgroundColor = color;
// }, 3000)

// Завдання "Затримка повідомлення": Створіть функцію,
//  яка приймає текстове повідомлення та затримує його виведення на сторінку на певний час, використовуючи setTimeout.

const message = document.getElementById("message");
const showMessageBtn = document.getElementById("showMessage");
const messageContainer = document.getElementById("messageContainer");

function showMessages() {
    if (!message.value) {
        alert("Enter message first.");
        return;
    }

    setTimeout(()=> {
        messageContainer.innerHTML = `<p>${message.value}</p>`
    }, 2000);
}
showMessageBtn.addEventListener('click', ()=> {showMessages()})

// Завдання "Зміна стилів": Створіть блок, який змінює свої стилі (наприклад, фоновий колір, розмір шрифту) через певний час. Використовуйте setTimeout для зміни стилів блоку.

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

class ColorChanger {
    constructor() {
        this.colorBox = document.getElementById('colorBox');
        this.currentColor = document.getElementById('currentColor');
        this.hexColor = document.getElementById('hexColor');
        this.rValue = document.getElementById('rValue');
        this.gValue = document.getElementById('gValue');
        this.bValue = document.getElementById('bValue');
        this.intervalInput = document.getElementById('interval');
        
        this.intervalId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.setRandomColor();
    }
    
    getRandomColorValue() {
        return Math.floor(Math.random() * 256);
    }
    
    rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
    
    setRandomColor() {
        const r = this.getRandomColorValue();
        const g = this.getRandomColorValue();
        const b = this.getRandomColorValue();
        
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        const hexColor = this.rgbToHex(r, g, b);
        
        this.colorBox.style.backgroundColor = rgbColor;
        
        this.currentColor.textContent = `RGB(${r}, ${g}, ${b})`;
        this.hexColor.textContent = hexColor;
        
        this.rValue.textContent = r;
        this.gValue.textContent = g;
        this.bValue.textContent = b;
        
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        this.currentColor.style.color = brightness > 128 ? 'black' : 'white';
        this.hexColor.style.color = brightness > 128 ? 'black' : 'white';
    }

    startAutoChange() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const interval = parseInt(this.intervalInput.value) || 1000;
        
        this.intervalId = setInterval(() => {
            this.setRandomColor();
        }, interval);
    }
    
    stopAutoChange() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    changeColorOnce() {
        this.setRandomColor();
    }

    destroy() {
        this.stopAutoChange();
    }
}

let colorChanger;

document.addEventListener('DOMContentLoaded', () => {
    colorChanger = new ColorChanger();
});

function startColorChange() {
    if (colorChanger) {
        colorChanger.startAutoChange();
    }
}

function stopColorChange() {
    if (colorChanger) {
        colorChanger.stopAutoChange();
    }
}

function changeColorOnce() {
    if (colorChanger) {
        colorChanger.changeColorOnce();
    }
}
window.addEventListener('beforeunload', () => {
    if (colorChanger) {
        colorChanger.destroy();
    }
});
btn1.addEventListener('click', ()=> {startColorChange()});
btn2.addEventListener('click', ()=> {stopColorChange()});
btn3.addEventListener('click', ()=> {changeColorOnce()});

// 5
let intervalId;
let timeoutId;
const btnStart = document.getElementById("btnStart");
const btnTime = document.getElementById("btnTime");
const btnCounting = document.getElementById("btnCounting");

function printNumbersInterval(from, to) {
    let current = from;
    
    intervalId = setInterval(() => {
        document.getElementById('output1').innerHTML += current + ' ';
        
        if (current === to) {
            clearInterval(intervalId);
        }
        current++;
    }, 1000);
}

function printNumbersTimeout(from, to) {
    let current = from;
    
    function run() {
        document.getElementById('output1').innerHTML += current + ' ';
        
        if (current < to) {
            current++;
            timeoutId = setTimeout(run, 1000);
        }
    }
    
    timeoutId = setTimeout(run, 1000);
}

function startInterval() {
    const from = parseInt(document.getElementById('from').value);
    const to = parseInt(document.getElementById('to').value);
    
    stopCounting();
    document.getElementById('output1').innerHTML = 'setInterval: ';
    printNumbersInterval(from, to);
}

function startTimeout() {
    const from = parseInt(document.getElementById('from').value);
    const to = parseInt(document.getElementById('to').value);
    
    stopCounting();
    document.getElementById('output1').innerHTML = 'setTimeout: ';
    printNumbersTimeout(from, to);
}

function stopCounting() {
    if (intervalId) clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
}

btnStart.addEventListener("click", ()=> {
    startInterval();
});
btnTime.addEventListener("click", ()=> {
    startTimeout();
});
btnCounting.addEventListener("click", ()=> {
    stopCounting();
});

// 6
let styleTimeoutId;
const btnChangeStyle = document.getElementById("btnChangeStyle");
const btnStopChangeStyle = document.getElementById("btnStopChangeStyle");

function changeStyles() {
    const block = document.getElementById('styleBlock');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1'];
    const fonts = [16, 20, 24, 28, 32];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    
    block.style.backgroundColor = randomColor;
    block.style.fontSize = randomFont + 'px';
    block.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    styleTimeoutId = setTimeout(changeStyles, 1500);
}

function startStyleChange() {
    stopStyleChange();
    changeStyles();
}

function stopStyleChange() {
    if (styleTimeoutId) clearTimeout(styleTimeoutId);
}

btnChangeStyle.addEventListener("click", ()=> {startStyleChange()});
btnStopChangeStyle.addEventListener("click", ()=> {stopStyleChange()});