/* I created classes for the hover on the slides and for the popup modal that appear when you click on a slide */

///// For hover on the slides : (it just needs some css styling)
// .card-hover (the big container for all the other classes below)
// .movie-title
// .movie-year
// .movie-genres
// .star (i don't think it needs styling)
// .movie-rate

////// For the movie popup modal :
// .movie-modal (you need to create an empty div with this class in your HTML, I'm putting everything inside with JS)
// .close-btn (for the close button)
// .movie-modal-container (this is a div I put after the .close-btn and it's divided into two other div so that you can display in flex or grid)
// .movie-modal-img (the first sub-div where the poster is)
// .movie-modal-text (the second sub-div where I've put all the text inside the div that are written below)
// .movie-modal-title
// .movie-modal-year
// .movie-modal-rate
// .movie-modal-genres
// .movie-modal-overview

//////////////////////////////
/* What I need everywhere */
//////////////////////////////

const options = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization:
         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZThiYjVkMGVlMzU5MzUwNzUxZmE4OWJmMjU5ODA1YiIsInN1YiI6IjY1MzI3ZDZhOGQyMmZjMDEwYjcxZWQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.abe8vhYOLyjjs1DdAeWtflxYzFNlkEpqai_DKaOU5zU",
   },
};

/* To get all the genre IDs, but I'm not using it after */
const fetchGenreId = async () => {
   const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
   );
   const data = await res.json();
   const genres = data.genres;
   console.log(genres);
};
fetchGenreId();

/* I'm just getting the movie-modal div */
const movieModal = document.querySelector(".movie-modal");

/* My super function that creates EVERYTHING */
const swiperSlides = (swiper, poster, title, year, genres, rate, overview) => {
   let movieGenres = [];
   // transform the genre IDs into names
   genres.forEach((id) => {
      if (id == 28) {
         movieGenres.push("Action");
      } else if (id == 12) {
         movieGenres.push("Adventure");
      } else if (id == 16) {
         movieGenres.push("Animation");
      } else if (id == 35) {
         movieGenres.push("Comedy");
      } else if (id == 80) {
         movieGenres.push("Crime");
      } else if (id == 99) {
         movieGenres.push("Documentary");
      } else if (id == 18) {
         movieGenres.push("Drama");
      } else if (id == 10751) {
         movieGenres.push("Family");
      } else if (id == 14) {
         movieGenres.push("Fantasy");
      } else if (id == 36) {
         movieGenres.push("History");
      } else if (id == 27) {
         movieGenres.push("Horror");
      } else if (id == 10402) {
         movieGenres.push("Music");
      } else if (id == 9648) {
         movieGenres.push("Mystery");
      } else if (id == 10749) {
         movieGenres.push("Romance");
      } else if (id == 878) {
         movieGenres.push("Science Fiction");
      } else if (id == 10770) {
         movieGenres.push("TV Movie");
      } else if (id == 53) {
         movieGenres.push("Thriller");
      } else if (id == 10752) {
         movieGenres.push("War");
      } else if (id == 37) {
         movieGenres.push("Western");
      }
   });
   //create the swiper-slides
   const slide = document.createElement("div");
   slide.classList.add("swiper-slide");
   // if there is no poster, then we don't create the slide
   if (poster != null) {
      slide.innerHTML = `<img src="https://image.tmdb.org/t/p/original${poster}" alt="">`;
      swiper.appendChild(slide);
   }
   // Displaying the info when the mouse enters the slide
   slide.addEventListener("mouseenter", (e) => {
      slide.innerHTML = `<div class="card-hover">
          <div class="movie-title">${title}</div>
          <div class="movie-year">${year}</div>
          <div class="movie-genres">${movieGenres.join(" / ")}</div>
          <div class="star"><svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M15.2599 1.64921C15.9661 -0.549736 19.0333 -0.549736 19.7372 1.64921L22.2559 9.50906C22.4098 9.98773 22.709 10.4048 23.1106 10.7007C23.5122 10.9966 23.9958 11.1561 24.4922 11.1565H32.6417C34.9227 11.1565 35.869 14.117 34.0259 15.478L27.4347 20.3343C27.0322 20.6304 26.7326 21.0482 26.5786 21.5277C26.4247 22.0072 26.4244 22.5239 26.5779 23.0035L29.0966 30.8634C29.8028 33.0623 27.3194 34.8936 25.4715 33.5327L18.8803 28.6764C18.4783 28.3803 17.9942 28.2209 17.4973 28.2209C17.0005 28.2209 16.5164 28.3803 16.1144 28.6764L9.52322 33.5327C7.67769 34.8936 5.19659 33.0623 5.90043 30.8634L8.4192 23.0035C8.57261 22.5239 8.57234 22.0072 8.41841 21.5277C8.26448 21.0482 7.9648 20.6304 7.56234 20.3343L0.973533 15.4803C-0.869639 14.1194 0.0790186 11.1589 2.35768 11.1589H10.5048C11.0016 11.159 11.4857 10.9997 11.8879 10.7038C12.29 10.4079 12.5895 9.99051 12.7435 9.51144L15.2622 1.65159L15.2599 1.64921Z" fill="#CC0000"/>
</svg>
</div>
          <div class="movie-rate">${rate}</div>
          </div>`;
      slide.style.background = `rgba(0, 0, 0, 0.5)`;
   });
   // Goind back the just the poster when the mouse leaves the slide
   slide.addEventListener("mouseleave", (e) => {
      slide.innerHTML = `<img src="https://image.tmdb.org/t/p/original${poster}" alt="">`;
   });
   // displaying the popup modal for the movies when a slide is clicked
   slide.addEventListener("click", () => {
      // We want to see the modal now
      movieModal.classList.remove("hidden");
      // That's the content of the modal
      movieModal.innerHTML = `<div class="close-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 9">
<line id="Line 2" x1="3.35355" y1="3.64645" x2="12.3536" y2="12.6464" stroke="white"/>
<line id="Line 3" x1="3.64645" y1="12.6464" x2="12.6464" y2="3.64645" stroke="white"/>
<circle id="Ellipse 1" cx="8" cy="8" r="7.5" stroke="white"/>
</g>
</svg></div>
<div class="movie-modal-container">
    <div class="movie-modal-img"><img src="https://image.tmdb.org/t/p/original${poster}" alt=""></div>
    <div class="movie-modal-text">
    <div class="movie-modal-title">${title}</div>
    <div class="movie-modal-year">${year}</div>
    <div class="movie-modal-rate"><svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M15.2599 1.64921C15.9661 -0.549736 19.0333 -0.549736 19.7372 1.64921L22.2559 9.50906C22.4098 9.98773 22.709 10.4048 23.1106 10.7007C23.5122 10.9966 23.9958 11.1561 24.4922 11.1565H32.6417C34.9227 11.1565 35.869 14.117 34.0259 15.478L27.4347 20.3343C27.0322 20.6304 26.7326 21.0482 26.5786 21.5277C26.4247 22.0072 26.4244 22.5239 26.5779 23.0035L29.0966 30.8634C29.8028 33.0623 27.3194 34.8936 25.4715 33.5327L18.8803 28.6764C18.4783 28.3803 17.9942 28.2209 17.4973 28.2209C17.0005 28.2209 16.5164 28.3803 16.1144 28.6764L9.52322 33.5327C7.67769 34.8936 5.19659 33.0623 5.90043 30.8634L8.4192 23.0035C8.57261 22.5239 8.57234 22.0072 8.41841 21.5277C8.26448 21.0482 7.9648 20.6304 7.56234 20.3343L0.973533 15.4803C-0.869639 14.1194 0.0790186 11.1589 2.35768 11.1589H10.5048C11.0016 11.159 11.4857 10.9997 11.8879 10.7038C12.29 10.4079 12.5895 9.99051 12.7435 9.51144L15.2622 1.65159L15.2599 1.64921Z" fill="#CC0000"/>
</svg> ${rate}</div>
<div class="movie-modal-genres">${movieGenres.join(" / ")}</div>
<div class="movie-modal-overview">${overview}</div>
    </div>
    </div>`;
      // That's the event to close the modal when we click the cross button
      movieModal.querySelector(".close-btn").addEventListener("click", () => {
         // We don't want to see the modal now
         movieModal.classList.add("hidden");
      });
   });
};

//////////////////////////////
/* SEARCH */
//////////////////////////////

/* Just getting everything I need in the search section */
const searchForm = document.querySelector(".search-bar");
const searchInput = document.querySelector("#search");
const results = document.querySelector(".search-result h2");
let inputValue;

const searchWrapper = document.querySelector(".search-results .swiper-wrapper");
const swiperSearchDisplay = document.querySelector(".search-results");

/* Creating the search swiper */
const swiperSearch = new Swiper(".search-results", {
   slidesPerView: 4,
   spaceBetween: 19,

   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

/* The function to fetch data based on what the user typed in the search bar */
const fetchSearchData = async () => {
   const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false`,
      options
   );
   const data = await res.json();
   const results = data.results;
   console.log(results);
   searchWrapper.innerHTML = "";
   // Using the SUPER FUNCTION for each element in the results to create the slides and everything
   results.forEach((element) => {
      swiperSlides(
         searchWrapper,
         element.poster_path,
         element.original_title,
         element.release_date,
         element.genre_ids,
         element.vote_average,
         element.overview
      );
   });
};

/* Preventing refresh by submitting the form */
searchForm.addEventListener("submit", (event) => {
   event.preventDefault();
});

/* Getting the user input in the search bar everytime it changes */
searchInput.addEventListener("change", () => {
   inputValue = searchInput.value;
   searchInput.value = "";
   results.innerText = `Results for "${inputValue}"`;
   swiperSearchDisplay.style.display = "block";
   fetchSearchData();
});

//////////////////////////////
/* LATEST */
//////////////////////////////

const latestWrapper = document.querySelector(
   ".latest-releases-results .swiper-wrapper"
);
latestWrapper.innerHTML = "";

const swiperLatest = new Swiper(".latest-releases-results", {
   slidesPerView: 4,
   spaceBetween: 19,

   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

const fetchLatestData = async () => {
   const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&primary_release_date.lte=2023-10-23&language=en-US&sort_by=popularity.desc`,
      options
   );
   const data = await res.json();
   const results = data.results;
   console.log(results);
   results.forEach((element) => {
      swiperSlides(
         latestWrapper,
         element.poster_path,
         element.original_title,
         element.release_date,
         element.genre_ids,
         element.vote_average,
         element.overview
      );
   });
};

fetchLatestData();

//////////////////////////////
/* GENRE */
//////////////////////////////

const genreWrapper = document.querySelector(
   ".movies-by-genre-results .swiper-wrapper"
);

const swiperGenre = new Swiper(".movies-by-genre-results", {
   slidesPerView: 4,
   spaceBetween: 19,

   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

const fetchGenreData = async () => {
   const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreID}`,
      options
   );
   const data = await res.json();
   const results = data.results;
   console.log(results);
   results.forEach((element) => {
      swiperSlides(
         genreWrapper,
         element.poster_path,
         element.original_title,
         element.release_date,
         element.genre_ids,
         element.vote_average,
         element.overview
      );
   });
};

const genreMenu = document.querySelector(".genres-menu ul");
const genreName = document.querySelector(".genres-list");
let genreID = 35;
genreWrapper.innerHTML = "";
fetchGenreData();

genreMenu.addEventListener("click", (e) => {
   genreWrapper.innerHTML = "";
   if (e.target.innerText == "Comedy") {
      genreID = 35;
      genreName.innerText = "Comedy";
   } else if (e.target.innerText == "Drama") {
      genreID = 18;
      genreName.innerText = "Drama";
   } else if (e.target.innerText == "Action") {
      genreID = 28;
      genreName.innerText = "Action";
   } else if (e.target.innerText == "Romance") {
      genreID = 10749;
      genreName.innerText = "Romance";
   } else if (e.target.innerText == "Fantasy") {
      genreID = 14;
      genreName.innerText = "Fantasy";
   } else if (e.target.innerText == "Animation") {
      genreID = 16;
      genreName.innerText = "Animation";
   }
   fetchGenreData();
});
