import API from "../api.js";
const root = document.getElementById('app')
export async function Popular() {
    const layout = `
        <header>
            TheMovieDB PoC
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
    const filmList = await API.fetchPopularMovies();
    
    console.log(filmList)
    let renderPopularMovies = (filmList) => {
        filmList.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            const { id, poster_path, original_title } = movieItem
            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');
            moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
            moviesElement.dataset.movie_id = id 
            listOfMovies.appendChild(moviesElement)
        });
        listOfMovies.addEventListener('click', (e) => {
            const closestMovie = e.target.closest('li')
            history.pushState(null,null,`/movie/${closestMovie.dataset.movie_id}`)
        })
    }
    renderPopularMovies(filmList);
}
