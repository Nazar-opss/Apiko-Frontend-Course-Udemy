import API from "./api.js";

let listOfMovies = document.getElementById('listOfMovies')
let loading = document.querySelector('.loading')

loading.remove();
const filmList = await API.fetchPopularMovies();
let storageSet = (id) => {
    

    id = id.split(" ")[2];
    // console.log(id)
    let activeButton = document.querySelectorAll('.like-button-active')
    console.log(activeButton)
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
    console.log(typeof(arr))
    return arr;
} 
let arrId = readLocalStorage();
console.log(typeof(arrId))

// let arrIDArray = [];
// for (let likes in arrId) {
//     if (arrId.hasOwnProperty(likes)) {
//         arrIDArray.push(likes)
//     }
// }
// console.log(arrIDArray)
// working here, isLiked problem and object instead of array
let renderPopularMovies = (filmList, arrId) => {
    filmList.forEach(movieItem => {
        const imagePath = "https://image.tmdb.org/t/p/w300";
        const {id, poster_path, original_title, isLiked = false } = movieItem
        // let exist = arrId.includes(movieItem.id)
        // console.log(exist)
        if(arrId){
            console.log('true')
        //     isLiked = true;
        }
        const moviesElement = document.createElement('li');
        moviesElement.classList.add('movie');
        moviesElement.innerHTML = `<img src="${imagePath + poster_path}" alt="#"/><h4>${original_title}</h4>
        <a href="#" class="like-button hover ${id} ${isLiked ? "like-button-active" : ""}">
            <i class="fa-solid fa-heart ${id} fa-xl"></i>
        </a>`;
        console.log(isLiked)
        
        listOfMovies.appendChild(moviesElement)
    });
    let likeButtons = document.querySelectorAll('a.like-button')
    
    likeButtons.forEach((button) =>{
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('like-button-active')
            storageSet(e.target.className);
        })
    })
}

renderPopularMovies(filmList, arrId);