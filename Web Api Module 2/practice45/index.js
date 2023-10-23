import API from "./api.js";
let searchBar = document.querySelector('.searchBar')
let filmList = document.querySelector('.filmList')
let result = document.querySelector('.results')
let search = new API;

searchBar.addEventListener('keyup', async (e) =>{
    if(e.key === 'Enter') {
        let searchText = searchBar.value;

        const filmArray = await search.fetchMoviesBySearchText(searchText);

        let count = filmArray.total_results;
            if (filmArray.total_results == 0) {
                result.innerHTML = `<h3>No results for: ${searchText}</h3>`;
            } else {
                result.innerHTML = `<h3>Results: ${count}</h3>`;
            }
        searchText = '';
        let renderMovies = (filmArray, filmList) =>{
            filmArray.forEach(element => {
                let imagePath = "https://image.tmdb.org/t/p/w300";
                const { poster_path, original_title } = element
                const moviesElement = document.createElement('li');
                moviesElement.classList.add('movie');
                    if (poster_path === null) {
                        imagePath = '\missing-image.png';
                        moviesElement.innerHTML = `<img src="${imagePath}" alt="#"/><h4>${original_title}</h4>`;
                    } else {
                        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
                    }
                filmList.appendChild(moviesElement)
            });
        }
        
        renderMovies(filmArray.results, filmList)
    }
});

// let renderMovies = (filmArray, filmList) =>{
//     filmArray.forEach(element => {
//         const imagePath = "https://image.tmdb.org/t/p/w300";
//         const { poster_path, original_title } = element
//         const moviesElement = document.createElement('li');
//         moviesElement.classList.add('movie');
//         moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>`;
//         filmList.appendChild(moviesElement)
//     });
// }
// renderMovies(filmArray, filmList)
