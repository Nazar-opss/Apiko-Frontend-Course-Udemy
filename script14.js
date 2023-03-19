//function unicFn(initialArray) {
    //let arry = initialArray;

    // function onlyUnique(value, index, array) {
    //     return array.indexOf(value) === index;
    // }
    // let unique = arry.filter(onlyUnique);
    // console.log(unique);
    //const unic = [];
    //initialArray.forEach((i) => {
    //    if (!unic.includes(i)) {
    //        unic.push(i);
    //    }
    //});
    //console.log(`[${unic}]`);
//}
//unicFn([2, 3, 1, 3, 3, 7]);
////////////////////////////////////////////////////////////
// function isEvenArray(initialArray) {
//     const arry = initialArray;
//     if (arry.every(elem => elem % 2 == 0)) {
//         console.log(`[${arry}] => "YES"`)
//     } else {
//         console.log(`[${arry}] => "NO"`)
//     }
// }
// isEvenArray([1, 2, 3, 9]);
// isEvenArray([2, 4, 6]);
////////////////////////////////////////////////////////////
// function filterArray(initialArray) {
//     const arry = initialArray;
//     const result = arry.filter(elem => typeof elem === 'string');
//     console.log(result); 
// }   
// filterArray(["string","test"]);
// filterArray([2, "string", 3, , , "test"]);
////////////////////////////////////////////////////////////
// function findUser(initialObject) {
//     const answ = [];
//     Object.entries(initialObject).forEach(([key, value]) => {
//         if (value.city === "London" && value.age > 18) {
//             answ.push(key);
//         }
//     });
//     console.log(answ);
// }
// findUser({
//     Max: {
//         age: 23,
//         city: "London"
//     },
//     Mike: {
//         age: 20,
//         city: "NY"
//     }
//     });
////////////////////////////////////////////////////////////
// function removeObj(arrayOfObj, keyName, value) {
//     console.log(arrayOfObj.filter((i) => i[keyName] !== value));
// }

// const arr = [{ age: 1 }, { age: 2 }, { age: 2 }, { year: 2 }];
// removeObj(arr, "age", 2);
// removeObj(arr, "year", 2);