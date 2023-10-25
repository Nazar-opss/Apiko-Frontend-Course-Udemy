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
