import API from "../api.js";
const root = document.getElementById('app')

export async function Movie() {
    const layout = `
        <header>
            TheMovieDB PoC
        </header>
        <main>
            <div>
                <div id="listOfMovies"></div>
            </div>
        </main>
    `
    
    root.innerHTML = layout;

    let listOfMovies = document.getElementById('listOfMovies')

    const { pathname } = window.location;

    const [, movie_id] = pathname.split('movie/')
    console.log(movie_id)

    const movie_details = await API.fetchMovieDetails(movie_id);
    
    let renderMovieDetails = (movie_details) => {
        const imagePath = "https://image.tmdb.org/t/p/w300";
        const {poster_path, original_title, vote_average, overview, genres } = movie_details
        
        const moviesElement = document.createElement('li');
        moviesElement.classList.add('movie');

        const movieGenres = genres.map(genre => genre.name)
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h3>Title: ${original_title}</h3><h3>Rating: ${vote_average}</h3><h3>Overview: ${overview}</h3><h3>Genres: ${movieGenres}</h3>`;
        listOfMovies.appendChild(moviesElement)
    }
    renderMovieDetails(movie_details)
}
