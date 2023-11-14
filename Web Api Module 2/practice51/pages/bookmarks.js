import API from "../api.js";
const root = document.getElementById('app')
export async function Bookmarks() {
    const layout = `
        <header>
            TheMovieDB PoC
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
    let popularMovies = document.querySelector('.popularMovies')
    let bookmarks = document.querySelector('.bookmarks')
    
    loading.remove();
    
    const filmList = await API.fetchPopularMovies();
    
    let storageSet = (id) => {
        id = id.split(" ")[2];
        let activeButton = document.querySelectorAll('.like-button-active')
        if(activeButton) {
            let arr = readLocalStorage()
            console.log(arr)
            const index = arr.indexOf(id)
            console.log(index)
            if (index === -1) {
                arr.push(id)
            } else {
                arr.splice(index, 1)
            }
            console.log(arr)
            return localStorage.setItem('Key', JSON.stringify(arr))
        }
    }
    
    let readLocalStorage = () => {
        let arr = localStorage.getItem('Key')
        arr = JSON.parse(arr)
    
        if (arr === null) {
            arr = [];
        }
        // console.log(typeof(arr))
        return arr;
    } 
    let arrId = readLocalStorage();
    
    let renderPopularMovies = (filmList, arrId) => {
        filmList.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            let {id, poster_path, original_title, isLiked = false } = movieItem
            
            arrId.forEach(elem => {
                if (elem.includes(movieItem.id)){
                    isLiked = true;
                }
            })
            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');
            moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>
            <a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
            <i class="fa-solid fa-heart ${id} fa-xl"></i>
            </a>`;
    
            listOfMovies.appendChild(moviesElement)  
            localStorage.setItem('Movie', JSON.stringify(filmList))
        });
    
        let  likeButtons  = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) =>{
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })
    }
    
    // renderPopularMovies(filmList, arrId);
    
    popularMovies.addEventListener('click', (e) => {
        listOfMovies.innerHTML = '';
    
        renderPopularMovies(filmList, arrId);
    })
    
    let renderBookmarkMovies = (bookmarkArray) =>{
        bookmarkArray.forEach(movieItem => {
            const imagePath = "https://image.tmdb.org/t/p/w300";
            let {id, poster_path, original_title, isLiked = false } = movieItem
            
            arrId.forEach(elem => {
                if (elem.includes(movieItem.id)){
                    isLiked = true;
                }
            })
            
            const moviesElement = document.createElement('li');
            moviesElement.classList.add('movie');
            moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>
            <a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
                <i class="fa-solid fa-heart ${id} fa-xl"></i>
            </a>`;
    
            if(isLiked == false) {
                moviesElement.innerHTML = '';
                moviesElement.style.padding = '0px'
            }
    
            listOfMovies.appendChild(moviesElement)
        })
        let  likeButtons  = document.querySelectorAll('a.like-button')
        likeButtons.forEach((button) =>{
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('like-button-active')
                storageSet(e.target.className);
            })
        })
    }
    // renderBookmarkMovies(bookmarkArray)
    
    bookmarks.addEventListener('click', (e) => {
        listOfMovies.innerHTML = '';
        let getMovie = localStorage.getItem('Movie')
        getMovie = JSON.parse(getMovie)
        // console.log(getMovie)
        
        renderBookmarkMovies(getMovie)
    }) 
}