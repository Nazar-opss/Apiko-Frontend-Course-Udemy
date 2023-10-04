// import { greeting, goodbye } from "./module/greeting.js";
// import User from "./module/user.js";

// const phrase = greeting.sayHello("ua");
// console.log(phrase);

// const phrase2 = goodbye.sayGoodBye("en");
// console.log(phrase2);

// const user1 = new User('John');
// console.log(user1.name);

//                                              some error in module:

// function getModuleName() {
//     return 'user.js';
// }

// // помилка, повинен бути рядок
// import module from getModuleName();

// const isUser = true;
// if(isUser) {
//     // Помилка, заборонено в if-else
//     import User from "./module/user.js";
// } else {
//     // Помилка, заборонено в if-else
//     import Admin from './admin.js';
// }

// {
//     // Помилка, ми не можемо ставити імпорт в блок
//     import Admin from './admin.js';
// }

// Dynamical modules

// import('path/to/module')
//     .then(module => {
//         // ... Module use
//     })
//     .catch(err => {
//         console.error('Err: ' + err)
//     });

// const loadModule = async () => {
//     const module = await import('path/to/module');
// }

// loadModule();

//                                                   Using Dynamical modules

// const isGreeting = true;

//const greetingUrl = './module/greeting.js';

// if (isGreeting) {
//     import(greetingUrl)
//         .then(module => {
//             const phrase = module.greeting.sayHello('es');
//             console.log(phrase)
//         })
//         .catch (err => console.warn(err))
// } else {
//     import('./module/greeting.js')
//         .then(module => {
//             const phrase = module.goodbye.sayGoodBye('en');
//             console.log(phrase)
//         })
//         .catch (err => console.warn(err))
// }

// const getUser = async () => {
//     const defaultModule = await import('./module/user.js')
//     const User = defaultModule.default;

//     const user1 =new User('Stepan');
//     console.log(user1.name);
// }

// getUser();

//                            Circular Dependencies
// пряма циклічна залежність
// файл a.js
// import { b } from 'b';
// ... 
// export a;

// файл b.js
// import { a } from 'a';
// ... 
// export b;

// A => B => A


// непряма циклічна залежність
// файл a.js
// import { b } from 'b';
// ... 
// export a;

// файл b.js
// import { c } from 'c';
// ... 
// export b;

// файл c.js
// import { a } from 'a';
// ... 
// export c;

// A => B => C =>