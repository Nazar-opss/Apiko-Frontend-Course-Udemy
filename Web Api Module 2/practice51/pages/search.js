import API from "../api.js";
import { asyncProvider } from "../loading.js";
import { readLocalStorage } from "./bookmarks.js";
import { storageSet } from "./bookmarks.js";

const root = document.getElementById('app')
export async function Search() {
    const layout = `
        <header>
            <div class='navigation'>
                <img src='../logo.svg' class='logo'/>
                <h2>Search</h2>
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
    let bookmarks = document.querySelector('.bookmarks')
    let home = document.querySelector('.logo')
    

    const search = window.location.search
    console.log(search)

    const [, query] = search.split('?query=')
    console.log(query)
    
   

    let page = 1
    const loadMore = document.createElement('button')

    const filmArray = await asyncProvider(API.fetchMoviesBySearchText.bind(API, query, page))
        
    let count = filmArray.total_results;

    if (filmArray.total_results == 0) {
        result.innerHTML = `<h3>No results for: ${query}</h3>`;
    } else {
        result.innerHTML = `<h3>Results: ${count}</h3>`;
    }

    let arrId = readLocalStorage()

    let renderMovies = (filmArray, filmList) => {
        filmArray.forEach(movieItem => {
            let imagePath = "https://image.tmdb.org/t/p/w300";
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
            
            if (poster_path === null) {
                imagePath = '\missing-image.png';
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
            filmList.appendChild(card)
        });
    }
    renderMovies(filmArray.results, filmList)
    
    let likeButtons = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                filmArray.results.forEach(movieItem =>{
                    let {id} = movieItem
                    
                    const closestMovie = e.target.closest(':not(div)')
                    
                    if(id == closestMovie.classList[2]){
                        console.log('Added to' )
                        if (localStorage.getItem('Movie') == null){
                            localStorage.setItem('Movie','[]')
                        }

                        let old_data = JSON.parse(localStorage.getItem('Movie'));

                        const index = old_data.findIndex(item => item.id === movieItem.id);
                        if (index === -1) {
                            old_data.push(movieItem);
                        } else {
                            old_data.splice(index, 1);
                        }

                        localStorage.setItem('Movie', JSON.stringify(old_data));
                    }
                })
                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })

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
    bookmarks.addEventListener('click', (e) => {
        history.pushState(null,null, `/bookmarks`)
    })
    home.addEventListener('click', (e) =>{
        history.pushState(null,null,`/`)
    })
}