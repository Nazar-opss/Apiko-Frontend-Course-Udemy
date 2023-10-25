import API from "./api.js";

let listOfMovies = document.getElementById('listOfMovies')
let loading = document.querySelector('.loading')

loading.remove();
const filmList = await API.fetchPopularMovies();
let storageSet = (id) => {

    id = id.split(" ")[2];
    let activeButton = document.querySelectorAll('.like-button-active')
    console.log(activeButton)
    if(activeButton) {
        let arr = readLocalStorage()
        const index = arr.indexOf(id)
        if (index === -1) {
            arr.push(id)
        } else {
            arr.splice(index, 1)
        }
        return localStorage.setItem('Key', JSON.stringify(arr))
    }
}

let readLocalStorage = () => {
    let arr = localStorage.getItem('Key')
    arr = JSON.parse(arr)
    if (arr === null) {
        arr = [];
    }
    console.log(arr)
    return arr;
} 

let renderPopularMovies = (filmList, readLocalStorage) => {
    filmList.forEach(movieItem => {

        const imagePath = "https://image.tmdb.org/t/p/w300";
        const {id, poster_path, original_title, isLiked } = movieItem
        const moviesElement = document.createElement('li');
        moviesElement.classList.add('movie');
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>
        <a href="#" class="like-button ${isLiked ? "like-button-active" : ""}">
            <i class="fa-solid fa-heart fa-xl ${id}"></i>
        </a>`
        ;
        listOfMovies.appendChild(moviesElement)
    });
    let likeButtons = document.querySelectorAll('a.like-button')
    likeButtons.forEach((button) =>{
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('like-button-active')
            storageSet(e.target.className)
        })
    })
}
renderPopularMovies(filmList, readLocalStorage);