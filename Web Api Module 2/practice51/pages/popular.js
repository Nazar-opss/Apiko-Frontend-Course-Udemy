import API from "../api.js";
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

    const filmList = await API.fetchPopularMovies();

    let home = document.querySelector('.logo')
    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })

    // console.log(filmList)
    let renderPopularMovies = (filmList) => {
        filmList.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            const { id, poster_path, original_title, isLiked = false } = movieItem
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
}
