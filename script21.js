//Приклад
capitalizeAllFirst(arr) // в консолі 'Result: Custom-Web-And-Mobile-Platforms length: 31'
allToLower(arr) // в консолі 'Result: custom - web - and - mobile - platforms length: 39'
//Підготовлений код
const arr = ["CusTom", "Web", "aNd", "MoBile", "PlaTfoRms"];
    
let compose = (f,g)=>(a) => f(g(a));
let add = (num) => num+10;
let multiply = (num) => num * 10;
let answer = compose(multiply, add)
console.log(answer(5));

    
let modifyArray; // your modify array function
    
let capitalizeAllFirst; // use compose + modifyArray here
    
let allToLower; // use compose + modifyArray here
    

// capitalizeAllFirst(arr) // в консолі 'Result: Custom-Web-And-Mobile-Platforms length: 31'
// allToLower(arr) // в консолі 'Result: custom - web - and - mobile - platforms length: 39'