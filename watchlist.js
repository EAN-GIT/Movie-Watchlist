const watchlistContainer = document.getElementById("watchlist-wrapper");


export  function displayWatchlist(){
    
    const watchListArray= JSON.parse(localStorage.getItem("Watchlist"))
    let html = " "
console.log(watchListArray)
if (!watchlistContainer) {
    console.error("Watchlist container not found");
    return;
  }

if(watchListArray.length > 0){

    //remove watchlist background text
    document.getElementById("watchlist-background-text").innerHTML = " "

    watchListArray.forEach(movie => {
        
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
                    <img class="plus" id="plusBtn" data-imdbId ="${movie.imdbId}" src="./images/minus-icon.png"  alt="Remove from Watchlist" />
                    <p data-imdbId ="${movie.imdbId} class="watchlist">Remove</p>
                    </button>
             </div>
             
              <p class="plot">${movie.Plot}</p>
             
             </div>

       </div>     
             `);
    });
    
    watchlistContainer.innerHTML = html;}
}




// Initial display of the watchlist when the page loads
displayWatchlist();