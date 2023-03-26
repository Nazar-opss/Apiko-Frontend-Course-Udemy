// Завдання 1
// write below code for global scope
    // let global = "Globe";
    // function globalFn() {
    //     console.log(global);
    // };
    // globalFn();
// write below code for function scope
    // function fnScope() {
    //     let fnScopeText = "Function";
    //     console.log(fnScopeText);
    // }
    // fnScope();
    // console.log(fnScopeText); // ReferenceError: fnScopeText is not defined
// write below code for block scope
    // function blockScope() {
    //     {
    //         let blockText = "Block"
    //         console.log(blockText);
    //     }
    //     console.log(blockText); // ReferenceError: blockText is not defined
    // }
    // blockScope()
////////////////////////////////////////////////////////////
// Завдання 2
    // const car = {
    //     name : "Tesla",
    //     model : "X",
    // };

    // function showCarInfo() {
    //     console.log(this.name);
    //     console.log(this.model);
    // }
    // const showCarInfoConsole = showCarInfo.bind(car);
    // showCarInfoConsole();
////////////////////////////////////////////////////////////
// Завдання 3
    // const cat = {
    //     sound: 'meow',
    //     greet: function() {
    //         setTimeout(function() {
    //             console.log(cat.sound)
    //       }, // write fix in this line of code
    //         0) 
    //     }
    // };
    // cat.greet(); // should produce "meow"
////////////////////////////////////////////////////////////
// Завдання 4
const dog = {
    sound: 'bark',
    greet: function() {
        setTimeout( () => { // fix code in this line
            console.log(dog.sound)
        },0)
    }
}    
    dog.greet();
