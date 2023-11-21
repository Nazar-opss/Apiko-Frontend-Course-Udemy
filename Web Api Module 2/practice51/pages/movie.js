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
                <h2 class='movieHeader'></h2>
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
    let searchBar = document.querySelector('.searchBar')
    let movieHeader = document.querySelector('.movieHeader')

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
        movieHeader.innerHTML = original_title
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
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h3>Title: ${original_title}</h3><h3>Rating: ${vote_average}</h3><h3>Overview: ${overview}</h3><h3>Genres: ${movieGenres}</h3><h2>Recommendations</h2>`;

        const like = document.createElement('div')
        like.innerHTML = `<a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
        <i class="fa-solid fa-heart ${id} fa-xl"></i>
        </a>`;

        card.appendChild(like)
        card.appendChild(moviesElement)

        listOfMovies.appendChild(card)
    }
    console.log(movie_details)
    
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
            card.classList.add('movieCard')

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

            // if(isLiked == true){
            //     if (localStorage.getItem('Movie3') == null){
            //         localStorage.setItem('Movie3','[]')
            //     }
            //     let old_data = JSON.parse(localStorage.getItem('Movie3'));
            //     old_data.push(movieItem)
            //     localStorage.setItem('Movie3', JSON.stringify(old_data))
            // }

            moviesElement.dataset.movie_id = id

            recommendationsMovie.appendChild(card)
        })
    }
    renderMovieRecommendations(movie_recommendations)

    let likeButtons = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let {id} = movie_details
                    
                    const closestMovie = e.target.closest(':not(div)')
                    
                    if(id == closestMovie.classList[2]){
                        console.log('Added to' )
                        if (localStorage.getItem('Movie3') == null){
                            localStorage.setItem('Movie3','[]')
                        }

                        let old_data = JSON.parse(localStorage.getItem('Movie3'));

                        const index = old_data.findIndex(item => item.id === movie_details.id);
                        // Перевіряємо, чи об'єкт вже є в масиві
                        if (index === -1) {
                            // Якщо об'єкта немає в масиві, додаємо його
                            old_data.push(movie_details);
                        } else {
                            // Якщо об'єкт вже є в масиві, видаляємо його
                            old_data.splice(index, 1);
                        }

                        // Зберігаємо оновлений масив в local storage
                        localStorage.setItem('Movie3', JSON.stringify(old_data));
                    }
                movie_recommendations.forEach(movieItem =>{
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


    recommendationsMovie.addEventListener('click', (e) => {
        const closestMovie = e.target.closest('li')
        history.pushState(null,null,`/movie/${closestMovie.dataset.movie_id}`)
    })
    searchBar.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            history.pushState(null, null, `/search?query=${searchBar.value}`)
        }
    })
    bookmarks.addEventListener('click', (e) => {
        history.pushState(null,null, `/bookmarks`)
    })
}

