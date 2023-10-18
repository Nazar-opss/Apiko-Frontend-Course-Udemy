// Дано:
// Сайт TheMovideDB https://www.themoviedb.org/, на якому у вільному доступі зібрана інформація про фільтри, телесеріали.

// Потрібно:

// Створити index.html, підключити до нього script.js

// Додати header елемент, в якому буде назва сайту (TheMovieDB PoC)

// Реалізувати клас Api, який буде мати метод fetchPopularMovies, який буде отримувати за допомогою API ключа список популярних фільмів

// В index.html додати елемент, в який буде відображатись список

// Реалізувати функцію renderPopularMovies, де використовуючи DOM API, відобразити список популярних фільмів, включаючи для кожного: poster (картинку) та Original title

// Стилізувати на власний розсуд (підключити styles.css)

// Що має получитись:
// Після відкриття сайту, повинний відобразитись текст “Loading popular movies”, сайт має зробити запит до сервера, після отримання результатів — текст має пропасти (елемент повинен бути видалений з дом-дерева), натомість має відобразитись список популярних фільмів.

// Документація:
// Інструкція для отримання АРІ ключа -https://developers.themoviedb.org/3/getting-started/introduction
// Отримання списку популярних фільмів - https://developers.themoviedb.org/3/movies/get-popular-movies
import API from "./api.js";

let listOfMovies = document.getElementById('listOfMovies')
let loading = document.querySelector('.loading')
loading.remove();
const filmList = await API.fetchPopularMovies();

let renderPopularMovies = (filmList) => {
    filmList.forEach(movieItem => {
        const imagePath = "https://image.tmdb.org/t/p/w300";
        const { poster_path, original_title } = movieItem
        const moviesElement = document.createElement('li');
        moviesElement.classList.add('movie');
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
        listOfMovies.appendChild(moviesElement)
    });
}
renderPopularMovies(filmList);
