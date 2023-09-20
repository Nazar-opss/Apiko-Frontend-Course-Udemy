// Завдання 1
// Створити ф-ію isString, яка першим параметром отримує функцію колбек та другим значення. 
// Перевіряє чи передане значення це стрічка і колбек це функція та виконує колбек із цим значенням або виводить помилку в консоль якщо це не стрічка або колбек не є функцією
// const cb = (data) => {
//     console.log(data)
// };

// function isString(callback, value) {
//     if(typeof(callback) === "function" && typeof(value) === "string") {
//         callback(value);
//     } else {
//        console.log("error 'is not function or value'")
//     }
// }
// isString(cb, "Kuka");

// console.log(typeof(cb));

// Завдання 2
// Дано: обєкт Date та його методи https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// Створити ф-ію clock, яка імітує поведінку годинника: кожну секунду виводить в консоль час у форматі "Hours:Minutes:Seconds";

// function clock() {
//     let date = new Date();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();

//     let time = `${hours}:${minutes}:${seconds}`
    
//     setTimeout(function(){clock()}, 1000)
    
//     console.log(time)
// } 
// clock();   

// Завдання 3
// Створити ф-ію timer, яка приймає число(секунди) та імітує поведінку таймера: кожну секунду виводить в консоль стрічку Timer: ${s}, де ${s} - кількість секунд що залишилось

// function timer(seconds, cb) {
//     let remainingTime = seconds;
//     setTimeout(function() {
//         cb();
//         console.log(`Timer: ${remainingTime}`);
//         if(remainingTime > 0) {
//             timer(remainingTime - 1, cb);
//         }
//     }, 1000)
// }
// let callback = function(){}    

// timer(50, callback);

// Завдання 4
// Створити клас який містить поле name.
// Зробити так щоб це поле автоматично через 5с занулювалося(ставало null) після створення об’єкта
// Також добавити функцію(метод) цього класу яка буде зупиняти(скасовувати) це занулювання

// class containName {
//     constructor(name) {
//         this.name = name;
//         this.setNull();
//     }
//     setNull() {
//         this.id = setTimeout(() => {
//             (this.name = null);
//             console.log(this.name);
//         }, 5000)
//     }
    
//     destroySetNull() {
//         clearTimeout(this.id);
//     }
// }
// let nameresult = new containName('kiki');
// console.log(nameresult.name);
// name.destroySetNull(); cancel null
