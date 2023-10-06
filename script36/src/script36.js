// Імпортнути конструктор класу User із папки сервіс

// Імпортнути усі Regexp із папки константів та перейменувати Regexp someName у urlReg (при імпорті, без використання додаткових змінних)
// Що таке Regexp можна переглянути тут https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
// Якщо коротко, то це правило за допомогою якого можна валідувати/тестувати якесь значення
// Приклад використання

// const reg = /[a-z]/ 
// reg.test(“g”) // поверне true
// reg.test(“G”) // поверне false
// reg.test(“123”) // поверне false
// reg.test(123) // поверне false

// Далі вам потрібно використати усі імпорти, а саме так. У вас є масив testUserList по якому вам потрібно пройтися циклом та провалідувати його поля email, phoneNumber, businessSite відповідними регепсами. Якщо усі тести повертають істину, то створити юзера через конструктор із цими полями та запушити його у відповідний масив resultUserList. В кінці вивести цей масив у консоль

import User from "./services/user.js"
import { emailReg, phoneReg, someName as urlReg } from "./constants/regex.js"


const testUserList = [
  {
    name: "Max",
    email: "Max@gmail.com",
    phoneNumber: "0999",
    businessSite: "google.com"
  },
  {
    name: "John",
    email: "John@gmail.com",
    phoneNumber: "0999999999",
    businessSite: "http/google.com"
  },
  {
    name: "Alex",
    email: "Alex@gmail.com",
    phoneNumber: "0999999999",
    businessSite: "https://google.com"
  },
  {
    name: "Mike",
    email: "Mike.com",
    phoneNumber: "0999999999",
    businessSite: "https://google.com"
  },
  {
    name: "Ben",
    email: "Ben.com",
    phoneNumber: "qwejviep",
    businessSite: "https://google.com"
  }
];

const resultUserList = [];

for (const { name, businessSite, email, phoneNumber } of testUserList) {
  // let result = String(str.email).match(emailReg);
  // console.log(result)
  console.log("email :" + emailReg.test(email));
  console.log("phone :" + phoneReg.test(phoneNumber));
  console.log("site :" + urlReg.test(businessSite));
    if (emailReg.test(email) && phoneReg.test(phoneNumber) && urlReg.test(businessSite) ) {
      let newUser = new User(name, {email, phoneNumber, businessSite});
      resultUserList.push(newUser);
  }
}

console.log(resultUserList);
