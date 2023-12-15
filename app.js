const searchBtn = document.getElementById("search-btn");
const mainBackground = document.getElementById("main-background");
const movieContainer = document.getElementById("movie-container");
const watchlistContainer = document.getElementById("watchlist-wrapper")


import { displayWatchlist } from "./watchlist.js";

const apiKey = "fa4c3515";
let watchListArray =  JSON.parse(localStorage.getItem("Watchlist"))|| []
let movieResultArray = [];
// const

searchBtn.addEventListener("click", () => {
    mainBackground.style.display = "none";

    movieResultArray =[]

    getMovieId(); //cal search movie func
});


// const addButton = document.getElementById(`add-${movie.imdbID}`);

async function getMovieId() {
  const searchInput = document.getElementById("search-bar").value;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`
    );
    //    http://www.omdbapi.com/?apikey=[yourkey]&
    //
    if (!response.ok) {

        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();

    if(!data || !data.Search){
      movieContainer.innerHTML = `
                        <p class="search-error">Unable to find what you’re looking for. Please try another search.</p>
                `
                console.log("hhhh")
                return
    }
    
    console.log(data.Search);
    
    let movieIdArray = [];
    
    if (data) {
        data.Search.forEach((element) => {
            movieIdArray.push(element.imdbID);
        });
        
        console.log(movieIdArray);
        getMoviebyId(movieIdArray);
    }
} catch (error) {
    // console.log(error);
}
}



function getMoviebyId(idArray) {
    idArray.forEach((itemId) => {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${itemId}`)
        .then((res) => res.json())
        .then((data) => {
            //push to the movie resukt array
            movieResultArray.push(data);
            console.log(data);
           
        //call the displaySearcadat to display rthe movie on page
        displaySearchData(movieResultArray);

        // addToWatchlist(data)
      });
  })
  
  }
  //fetc movie dat by the id gotten from moviesArray


function displaySearchData(movies) {

  let html = " ";

  movies.forEach((movie) => {
    console.log(movie);
    return (html += `
        
        <div class="movie-container-inner">
          
            <div class="poster-container">
            <img src=${movie.Poster}/>
             </div>

            <div class="movie-details-container">
        
             <div class="title-rating">
                    <h2>${movie.Title}</h2>
                    <div id="title-rating-unit">
                    <img id="star" src="images/star-icon.png" />
                    <p>${movie.imdbRating}</p></div>
             </div>
            <div class="time-genre">
                    <p class="time">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <button class="add-to-watchlist" id="button" data-imdbId="${movie.imdbID}">
                    <img class="plus" id="plusBtn" data-imdbId ="${movie.imdbId}" src="./images/plus-icon.png"  alt="Add to Watchlist" />
                    <p data-imdbId ="${movie.imdbId} class="watchlist">Watchlist</p>
                    </button>
             </div>
             
              <p class="plot">${movie.Plot}</p>
             
             </div>

       </div>     
             `);

            });


  movieContainer.innerHTML = html;
        
            // addToWatchlist(movies);
        
  
}



// function addToWatchlist(movie){

//     if(movie.Title){
   
    movieContainer.addEventListener("click",(e)=>{

        
      const clickedButton = e.target.closest('.add-to-watchlist');

      if (clickedButton) {
        const imdbId = clickedButton.dataset.imdbid; // Corrected the attribute name
        const clickedMovie = movieResultArray.find(movie => movie.imdbID === imdbId);

        if (clickedMovie) {
          watchListArray.push(clickedMovie);
          localStorage.setItem("Watchlist", JSON.stringify(watchListArray));
           
          
          clickedButton.innerHTML = `
          <p class="movie-data"><span style="color: #08a32a; font-weight: 500;">&#10003 Added</span></p>
          `;
          clickedButton.setAttribute('disabled', '')}}
          
          displayWatchlist();///call funct to display watchlist
    

    })

    // }
// }
