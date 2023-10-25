import API from "./api.js";
let searchBar = document.querySelector('.searchBar')
let filmList = document.querySelector('.filmList')
let result = document.querySelector('.results')
let footer = document.querySelector('footer')


let search = new API;

searchBar.addEventListener('keyup', async (e) =>{
    if(e.key === 'Enter') {
        let searchText = searchBar.value;
        let page = 1
        const loadMore = document.createElement('button')
        
        const filmArray = await search.fetchMoviesBySearchText(searchText, page);
        console.log(filmArray.total_pages)
        let count = filmArray.total_results;
            if (filmArray.total_results == 0) {
                result.innerHTML = `<h3>No results for: ${searchText}</h3>`;
            } else {
                result.innerHTML = `<h3>Results: ${count}</h3>`;
            }
        searchBar.value = '';
        let renderMovies = (filmArray, filmList) =>{
            filmArray.forEach(element => {
                let imagePath = "https://image.tmdb.org/t/p/w300";
                const { poster_path, original_title } = element
                const moviesElement = document.createElement('li');
                moviesElement.classList.add('movie');
                    if (poster_path === null) {
                        imagePath = '\missing-image.png';
                        moviesElement.innerHTML = `<img src="${imagePath}" alt="#"/><h4>${original_title}</h4><i class="fa-solid fa-xl fa-heart"></i>`;
                    } else {
                        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4><i class="fa-solid fa-xl fa-heart"></i>`;
                    }
                filmList.appendChild(moviesElement)
            });
        }
        renderMovies(filmArray.results, filmList)

        if (filmArray.total_pages > filmArray.page) {
            loadMore.classList.add('btn','btn-primary', 'loadMore_button')
            loadMore.innerText = "Load More"
            footer.appendChild(loadMore)
            loadMore.addEventListener('click', async (e) =>{
                page++;
                const filmArray = await search.fetchMoviesBySearchText(searchText, page);
                renderMovies(filmArray.results, filmList)

                console.log(filmArray.total_pages)
                console.log(filmArray.page)

                if(page == filmArray.total_pages) {
                    loadMore.remove();
                }
            })
        }
        
    }
});


