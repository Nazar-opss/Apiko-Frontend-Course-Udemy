// function printPowsOf2(number) {
//         if (Number.isInteger(number) || Number.isNaN(number)) {
//             let i = 1;
//             do {
//                 console.log(i);
//                 i = i * 2
//             } while (i <= number);
//         } else {
//             console.log(`"${number}" - "incorrect type"`);
//         }
//     }
//     printPowsOf2("302");
//     printPowsOf2(null);
//     printPowsOf2(128);
//     printPowsOf2(64);
//     printPowsOf2(60);

// function calculateSumOfArray() {
//     const initialArray = [3, 2, "2", null, 1.5, 9.5, undefined];
//     let total = 0;
//         initialArray.forEach(element => {
//             if (Number.isFinite(element)) {
//                 total += element;
//             }    
//         });
//     console.log(total);
// }
// calculateSumOfArray();

// function printSeasonByMonth(month) {
//     switch (month) {
//         case "SEPTEMBER":
//         case "OCTEBER":
//         case "NOVEMBER":
//             console.log("autumn")
//             break;
//         case "JUNE":
//         case "JULY":
//         case "AUGUST":
//             console.log("summer")
//             break;
//         case "MARCH":
//         case "APRIL":
//         case "MAY":
//             console.log("spring")
//             break;
//         case "DECEMBER":
//         case "JANUARY":
//         case "FEBRUARY":
//             console.log("winter")
//             break;
//         default:
//             break;
//     }
// }    
// printSeasonByMonth("SEPTEMBER");
// printSeasonByMonth("NOVEMBER");
// printSeasonByMonth("JULY");
// printSeasonByMonth("APRIL");

// function calculateWordsInString(string) {
//     console.log(string.split(/\s+/).length); // my version

//     let wordCount = 1;
//     for (let i = 0; i < string.length; i++) {
//         if (string[i] === " " && string[i + 1] !== " ") {
//             wordCount++;
//         }
//     }
//     console.log(wordCount); // some guy from internet version
// }
// calculateWordsInString("Easy string for count");
// calculateWordsInString("Easy");
// calculateWordsInString("Some string with a triple   space");
// calculateWordsInString("Some?  string, with a triple   space");