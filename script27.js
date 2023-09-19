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

function timer(int) {
    // let date = new Date(0)
    // let setSeconds = date.setSeconds(int)
    // int = int-1;

    // let time = `Timer: ${int}`
    
    // console.log(time)
    console.log(int);
}    

timer(34);
// Завдання 4
// Створити клас який містить поле name.
// Зробити так щоб це поле автоматично через 5с занулювалося(ставало null) після створення об’єкта
// Також добавити функцію(метод) цього класу яка буде зупиняти(скасовувати) це занулювання



