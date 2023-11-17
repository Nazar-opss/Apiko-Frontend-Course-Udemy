import API from "../api.js";
import { asyncProvider } from "../loading.js";
import { readLocalStorage } from "./bookmarks.js";
import { storageSet } from "./bookmarks.js";
const root = document.getElementById('app')
export async function Popular() {
    const layout = `
        <header>
            <div class='navigation'>
                <img src='../logo.svg' class='logo'/>
                TheMovieDB PoC
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

    loading.remove();
    let searchBar = document.querySelector('.searchBar')
    let bookmarks = document.querySelector('.bookmarks')

    const filmList = await asyncProvider(API.fetchPopularMovies.bind(API)) 

    let home = document.querySelector('.logo')
    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })

    // let storageSet = (id) => {
    //     id = id.split(" ")[2];
    //     let activeButton = document.querySelectorAll('.like-button-active')
    //     if (activeButton) {
    //         let arr = readLocalStorage()
    //         console.log(arr)
    //         const index = arr.indexOf(id)
    //         console.log(index)
    //         if (index === -1) {
    //             arr.push(id)
    //         } else {
    //             arr.splice(index, 1)
    //         }
    //         console.log(arr)
    //         return localStorage.setItem('Key', JSON.stringify(arr))
    //     }
    // }

    // let readLocalStorage = () => {
    //     let arr = localStorage.getItem('Key')
    //     arr = JSON.parse(arr)

    //     if (arr === null) {
    //         arr = [];
    //     }
    //     // console.log(typeof(arr))
    //     return arr;
    // }
    let arrId = readLocalStorage()

    // console.log(filmList)
    let renderPopularMovies = (filmList) => {
        filmList.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            let { id, poster_path, original_title, isLiked = false } = movieItem

             arrId.forEach(elem => {
                if (elem.includes(movieItem.id)) {
                    isLiked = true;
                }
            })

            const card = document.createElement('div')
            card.style.flexDirection = 'column'
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

            moviesElement.dataset.movie_id = id;

            listOfMovies.appendChild(card)
        });

    }
    renderPopularMovies(filmList);

    let likeButtons = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })
    
    listOfMovies.addEventListener('click', (e) => {
        const closestMovie = e.target.closest('li')
        history.pushState(null,null,`/movie/${closestMovie.dataset.movie_id}`)
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