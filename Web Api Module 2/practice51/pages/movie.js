import API from "../api.js";
import { asyncProvider } from "../loading.js";
import { readLocalStorage } from "./bookmarks.js";
import { storageSet } from "./bookmarks.js";

const root = document.getElementById('app')

export async function Movie() {
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
                <div id="listOfMovies"></div>
                <div id="recommendationsMovie"></div>
            </div>
        </main>
    `
    
    root.innerHTML = layout;

    let listOfMovies = document.getElementById('listOfMovies')
    let recommendationsMovie = document.getElementById('recommendationsMovie')    
    let home = document.querySelector('.logo')
    let bookmarks = document.querySelector('.bookmarks')

    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })

    const { pathname } = window.location;
    // console.log(pathname)
    const [, movie_id] = pathname.split('movie/')
    console.log(movie_id)

    const movie_details = await asyncProvider(API.fetchMovieDetails.bind(API, movie_id))
    const movie_recommendations = await asyncProvider(API.fetchMoviesRecommendations.bind(API, movie_id))
    
    let arrId = readLocalStorage()

    let renderMovieDetails = (movie_details) => {
        const imagePath = "https://image.tmdb.org/t/p/w300";
        let {id, poster_path, original_title, vote_average, overview, genres, isLiked = false } = movie_details
        
        arrId.forEach(elem => {
            if (elem.includes(movie_details.id)) {
                isLiked = true;
            }
        })

        const card = document.createElement('div')
        card.style.flexDirection = 'column'
        const moviesElement = document.createElement('li');
        moviesElement.classList.add('movie');

        const movieGenres = genres.map(genre => genre.name)
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h3>Title: ${original_title}</h3><h3>Rating: ${vote_average}</h3><h3>Overview: ${overview}</h3><h3>Genres: ${movieGenres}</h3>`;

        const like = document.createElement('div')
        like.innerHTML = `<a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
        <i class="fa-solid fa-heart ${id} fa-xl"></i>
        </a>`;

        card.appendChild(like)
        card.appendChild(moviesElement)

        listOfMovies.appendChild(card)
    }

    renderMovieDetails(movie_details)

    let renderMovieRecommendations = (movie_recommendations) =>{
        movie_recommendations.forEach(movieItem =>{
            let imagePath = "https://image.tmdb.org/t/p/w300";
            let {id, poster_path, original_title, isLiked = false} = movieItem
            
            arrId.forEach(elem => {
                if (elem.includes(movieItem.id)) {
                    isLiked = true;
                }
            })

            const card = document.createElement('div')
            card.style.flexDirection = 'column'

            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');
    
            if (poster_path === null) {
                imagePath = '../missing-image.png';
                moviesElement.innerHTML = `<img src="${imagePath}" alt="#"/><h4>${original_title}</h4>`;
            } else {
                moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
            }

            const like = document.createElement('div')
            like.innerHTML = `<a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
            <i class="fa-solid fa-heart ${id} fa-xl"></i>
            </a>`;

            card.appendChild(like)
            card.appendChild(moviesElement)

            moviesElement.dataset.movie_id = id

            recommendationsMovie.appendChild(card)
        })
    }
    renderMovieRecommendations(movie_recommendations)

    let likeButtons = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // movie_recommendations.forEach(movieItem =>{

                // })

                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })


    recommendationsMovie.addEventListener('click', (e) => {
        const closestMovie = e.target.closest('li')
        history.pushState(null,null,`/movie/${closestMovie.dataset.movie_id}`)
    })
    bookmarks.addEventListener('click', (e) => {
        history.pushState(null,null, `/bookmarks`)
    })
}

