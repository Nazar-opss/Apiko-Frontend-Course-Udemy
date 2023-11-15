import API from "../api.js";
const root = document.getElementById('app')
export async function Search() {
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
            <div class="results">

            </div>
            <div class="filmList">

            </div>
        </main>
        <footer>
        
        </footer>
    `
    
    root.innerHTML = layout;
    
    let searchBar = document.querySelector('.searchBar')
    let filmList = document.querySelector('.filmList')
    let result = document.querySelector('.results')
    let footer = document.querySelector('footer')
    

    // const location = window.location.pathname
    // console.log(location)
    const search = window.location.search
    console.log(search)

    const [, query] = search.split('?query=')
    console.log(query)
    
    let home = document.querySelector('.logo')
    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })

    let page = 1
    const loadMore = document.createElement('button')

    const filmArray = await API.fetchMoviesBySearchText(query, page);
    console.log(filmArray.total_pages)
    let count = filmArray.total_results;
    if (filmArray.total_results == 0) {
        result.innerHTML = `<h3>No results for: ${query}</h3>`;
    } else {
        result.innerHTML = `<h3>Results: ${count}</h3>`;
    }
    let renderMovies = (filmArray, filmList) => {
        filmArray.forEach(element => {
            let imagePath = "https://image.tmdb.org/t/p/w300";
            const {
                id,
                poster_path,
                original_title,
                isLiked = false
            } = element
            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');
            if (poster_path === null) {
                imagePath = '\missing-image.png';
                moviesElement.innerHTML = `<img src="${imagePath}" alt="#"/><h4>${original_title}</h4>`;
            } else {
                moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
            }
            moviesElement.dataset.movie_id = id
            filmList.appendChild(moviesElement)
        });
    }
    renderMovies(filmArray.results, filmList)

    if (filmArray.total_pages > filmArray.page) {
        loadMore.classList.add('btn', 'btn-primary', 'loadMore_button')
        loadMore.innerText = "Load More"
        footer.appendChild(loadMore)
        loadMore.addEventListener('click', async (e) => {
            page++;
            const filmArray = await API.fetchMoviesBySearchText(query, page);
            renderMovies(filmArray.results, filmList)

            if (page == filmArray.total_pages) {
                loadMore.remove();
            }
        })
    }

    searchBar.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            history.pushState(null, null, `/search?query=${searchBar.value}`)
        }
    })
    filmList.addEventListener('click', (e) => {
        const closestMovie = e.target.closest('li')
        history.pushState(null, null, `/movie/${closestMovie.dataset.movie_id}`)
    })
}