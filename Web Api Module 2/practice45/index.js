import API from "./api.js";
let searchBar = document.querySelector('.searchBar')
let filmList = document.querySelector('.filmList')
let result = document.querySelector('.results')
let search = new API;

searchBar.addEventListener('keyup', async (e) =>{
    if(e.key === 'Enter') {
        const filmArray = await search.fetchMoviesBySearchText(searchBar.value);
        searchBar.value = '';
        let renderMovies = (filmArray, filmList) =>{
            // const createResult = document.createElement('h3')
            // console.log()
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
        renderMovies(filmArray, filmList)
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
