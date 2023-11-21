import API from "../api.js";
import { asyncProvider } from "../loading.js";
const root = document.getElementById('app')
export async function Bookmarks() {
    const layout = `
        <header>
            <div class='navigation'>
                <img src='../logo.svg' class='logo'/>
                <h2>Bookmarks</h2>
                <button type="button" class="btn btn-primary mt-1 bookmarks">Bookmarks</button>
            </div>
            <div class="input-group mb-3 w-100">
                <input type="search" class="searchBar
                form-control mt-2" placeholder="search">
            </div>
        </header>
        <main>
            <div>
                <div class="loading">Loading popular movies...</div>
                <div id="listOfMovies"></div>
            </div>
        </main>
    `

    root.innerHTML = layout;

    let listOfMovies = document.getElementById('listOfMovies')
    let loading = document.querySelector('.loading')
    // let popularMovies = document.querySelector('.popularMovies')
    let bookmarks = document.querySelector('.bookmarks')
    let searchBar = document.querySelector('.searchBar')
    let home = document.querySelector('.logo')

    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })


    loading.remove();

    const filmList = await asyncProvider(API.fetchPopularMovies.bind(API)) 

    let storageSet = (id) => {
        id = id.split(" ")[2];
        let activeButton = document.querySelectorAll('.like-button-active')
        if (activeButton) {
            let arr = readLocalStorage()
            console.log(arr)
            const index = arr.indexOf(id)
            console.log(index)
            if (index === -1) {
                arr.push(id)
            } else {
                arr.splice(index, 1)
            }
            console.log(arr)
            return localStorage.setItem('Key', JSON.stringify(arr))
        }
    }

    let readLocalStorage = () => {
        let arr = localStorage.getItem('Key')
        arr = JSON.parse(arr)

        if (arr === null) {
            arr = [];
        }
        // console.log(typeof(arr))
        return arr;
    }
    let arrId = readLocalStorage();

    let getMovie = localStorage.getItem('Movie3')
        getMovie = JSON.parse(getMovie)

    let renderPopularMovies = (filmList, arrId) => {
        filmList.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            let {
                id,
                poster_path,
                original_title,
                isLiked = false
            } = movieItem

            arrId.forEach(elem => {
                if (elem.includes(movieItem.id)) {
                    isLiked = true;
                }
            })

            const card = document.createElement('div')
            card.classList.add('movieCard')

            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');

            moviesElement.innerHTML = `<div id='movieInfo'>
            <img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>
            </div>
            `;

            const like = document.createElement('div')
            like.innerHTML = `<a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
            <i class="fa-solid fa-heart ${id} fa-xl"></i>
            </a>`;

            card.appendChild(like)
            card.appendChild(moviesElement)
            
            if (isLiked == false) {
                moviesElement.innerHTML = ''
                moviesElement.style.padding = '0px'
                like.innerHTML = ''
            }

            moviesElement.dataset.movie_id = id;

            listOfMovies.appendChild(card)
            // localStorage.setItem('Movie', JSON.stringify(filmList))
        });

        let likeButtons = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                getMovie.forEach(movieItem =>{
                    let {id} = movieItem
                    
                    const closestMovie = e.target.closest(':not(div)')
                    
                    if(id == closestMovie.classList[2]){
                        console.log('Added to' )
                        if (localStorage.getItem('Movie3') == null){
                            localStorage.setItem('Movie3','[]')
                        }

                        let old_data = JSON.parse(localStorage.getItem('Movie3'));

                        const index = old_data.findIndex(item => item.id === movieItem.id);
                        // Перевіряємо, чи об'єкт вже є в масиві
                        if (index === -1) {
                            // Якщо об'єкта немає в масиві, додаємо його
                            old_data.push(movieItem);
                        } else {
                            // Якщо об'єкт вже є в масиві, видаляємо його
                            old_data.splice(index, 1);
                        }

                        // Зберігаємо оновлений масив в local storage
                        localStorage.setItem('Movie3', JSON.stringify(old_data));
                    }
                })
                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })
    }
    
    renderPopularMovies(getMovie, arrId);

    listOfMovies.addEventListener('click', (e) => {
        const closestMovie = e.target.closest('li')
        history.pushState(null, null, `/movie/${closestMovie.dataset.movie_id}`)
    })
    searchBar.addEventListener('keyup', async (e) =>{
        if(e.key === 'Enter') {
            history.pushState(null,null,`/search?query=${searchBar.value}`)
        }
    })
    bookmarks.addEventListener('click', (e) => {
        history.pushState(null,null, `/bookmarks`)
    })
}

export function readLocalStorage() {
    let arr = localStorage.getItem('Key')
    arr = JSON.parse(arr)

    if (arr === null) {
        arr = [];
    }
    // console.log(typeof(arr))
    return arr;
}

export let storageSet = (id) => {
    id = id.split(" ")[2];
    let activeButton = document.querySelectorAll('.like-button-active')
    if (activeButton) {
        let arr = readLocalStorage()
        console.log(arr)
        const index = arr.indexOf(id)
        console.log(index)
        if (index === -1) {
            arr.push(id)
        } else {
            arr.splice(index, 1)
        }
        console.log(arr)
        return localStorage.setItem('Key', JSON.stringify(arr))
    }
}