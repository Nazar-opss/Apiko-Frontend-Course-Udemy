// Завдання 1
// На лекції ми використовували API jsonplaceholder - 'https://jsonplaceholder.typicode.com/'
// Можна перейти за посиланням і ще раз ознайомитись з даним API
// Можна створити константу baseUrl = https://jsonplaceholder.typicode.com
// const baseUrl = "https://jsonplaceholder.typicode.com";
// Будемо використовувати ресурс /users щоб отримати дані користувачів
// Завдання: Отримати список користувачів з віддаленого ресурсу /users.
// Використати fetch.
// Очікуваний результат - масив користувачів

// Result: [
//  {
//    id: 1
//    name: "Leanne Graham"
//    username: "Bret"
//    email: "Sincere@april.biz"
//    address: Object
//    phone: "1-770-736-8031 x56442"
//    website: "hildegard.org"
//    company: Object
//  },
//  {
//    id: 2
//    ...
//  },
//  ...
// ]
// const baseUrl = "https://jsonplaceholder.typicode.com";

// let promise = fetch(`${baseUrl}/users`)
//     .then(response => response.json())
//     .then(json => console.log(json));

// Завдання 2
// Крім ресурсу /users API надає ще інші ресурси, наприклад /albums щоб отримати дані фотоальбомів
// І ці ресурси можуть залежати один від одного, наприклад ми можемо отримати альбоми які належать певному користувачу за допомогою ендпоінту /users/1/albums - отримаємо альбоми користувача у якого поле id = 1
// Завдання. Отримати список усіх альбомів які належать користувачу з id - 10.
// Використати fetch.
// Після отримання відповіді від API, перевірити чи запит виконався успішно (чи знаходиться код відповіді в діапазоні 200-299)
// Вивести у консоль результат

// fetch(`${baseUrl}/...`);

// Очікуваний результат - масив альбомів користувача 10

// Result:
// [
//  {
//    userId: 1
//    id: 1
//    title: "quidem molestiae enim"
//  },
//  {
//    userId: 1
//    id: 2
//    title: "sunt qui excepturi placeat culpa"
//  },
//  ...
// ]

// const baseUrl = "https://jsonplaceholder.typicode.com"

// let promise = fetch(`${baseUrl}/users/10/albums`)
//     .then(response => response.json(console.log(response.status)))
//     .then(json => console.log(json))

// Завдання 3
// Завдання. Створити нового користувача - зробити POST запит на ендпоінт 'https://jsonplaceholder.typicode.com/users'.
// Використати fetch.a
// Для нового користувача вказати поля name, username, email.
// Оскільки дане API працює з JSON то body запиту повинне бути у JSON форматі.
// Вказати для запиту заголовок 'Content-type' з значенням 'application/json'
// Після отримання відповіді від API, перевірити чи запит виконався успішно
// Вивести у консоль результат

// const newUser = {
//  name: "Name LastName",
//  username: "UserName",
//  email: "usermail@gmail.com"
// };
 
// fetch(`${baseUrl}/users`, {});

// Очікуваний результат - створений новий користувач
// Result: { name: "Name LastName", username: "UserName", email: "usermail@gmail.com", id: 11 }

// const baseUrl = "https://jsonplaceholder.typicode.com"

// let newUser = {
//     name: "Name LastName",
//     username: "UserName",
//     email: "usermail@gmail.com"
// }

// let promise = fetch(`${baseUrl}/users`,{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(newUser)
// })
// .then(response => response.json(setTimeout(function(){console.log(response.status)}, 2000)))
// .then(json => console.log(json))

// Завдання 4
// Отримати список вказаних альбомів, вказуючи їхні id.
// Для цього потрібно використати ресурс /albums.
// Щоб отримати альбом з id - 5, можна використати ендпоінт /albums/5
// Але дане API не надає можливості вказати декілька id альбомів щоб отримати ці альбоми в одному запиті
// Тому потрібно робити декілька запитів якщо хочемо отримати декілька альбомів
// Написати функцію getAlbum(id), яка буде приймати id альбому який потрібно отримати.
// функція getAlbum повинна повертати проміс, який у разі успішного виконання повертає дані альбому
// Написати функцію getSpecifiedAlbums(ids = []), яка буде приймати масив ids з значеннями id для альбомів які потрібно отримати функція getSpecifiedAlbums() повинна повертати проміс, який у разі успішного виконання повертає масив вказаних альбомів
// Щоб getSpecifiedAlbums виконувалась швидше, усі запити на отримання певного альбому повинні виконуватись паралельно
// У разі успішного виконання промісу з getSpecifiedAlbums, вивести у консоль результат.

const baseUrl = "https://jsonplaceholder.typicode.com"

function getAlbum(id) {
    return fetch(`${baseUrl}/albums/${id}`)
            .then(response => response.json())
            .then(json => console.log(json))
}

function getSpecifiedAlbums(ids = []) {
 // returns Promise
    let promise = new Promise(function(resolve, reject){
        
    })
}
getAlbum(1);
// getSpecifiedAlbums([1, 15])
//     .then((results) => {
//         console.log("Results: ", results);
//     })
//     .catch((error) => {
//         console.log("Error: ", error);
//     });

// Очікуваний результат - масив вказаних альбомів

// [
//  {
//    id: 1
//    userId: 1
//    title: "quidem molestiae enim"
//  },
//  {
//    id: 15
//    userId: 2
//    title: "ut pariatur rerum ipsum natus repellendus praesentium"
//  },
//  ...
// ]
