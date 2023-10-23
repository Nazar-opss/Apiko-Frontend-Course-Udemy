class API {
    async fetchMoviesBySearchText(searchText){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU0NDAzOWUyZjcyNzE2MDQ1MjI0MTYyNTUzMjVhZiIsInN1YiI6IjY1MmQ1NTg4MDI0ZWM4MDEzYzU4ZWE2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWvRwpk_xlSh71byPoa1qFKZCmbgDyEUOxl3jrZ7puY'
            }
          };
          
          let search = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`, options)
          const data = await search.json();
          console.log(data.results); 
          return data;  
    }
}
export default API;