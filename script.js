const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZThiYjVkMGVlMzU5MzUwNzUxZmE4OWJmMjU5ODA1YiIsInN1YiI6IjY1MzI3ZDZhOGQyMmZjMDEwYjcxZWQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.abe8vhYOLyjjs1DdAeWtflxYzFNlkEpqai_DKaOU5zU",
  },
};

const fetchGenreId = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  );
  const data = await res.json();
  const genres = data.genres;
  console.log(genres);
  console.log(genres[0].id);
  console.log(genres[0].name);
};

fetchGenreId();

const swiperSlides = (swiper, poster) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  if (poster != null) {
    slide.innerHTML = `<img src="https://image.tmdb.org/t/p/original${poster}" alt="">`;
    swiper.appendChild(slide);
  }
};

/* SEARCH */
const searchForm = document.querySelector(".search-bar");
const searchInput = document.querySelector("#search");
const results = document.querySelector(".search-result h2");
let inputValue;

const searchWrapper = document.querySelector(".search-results .swiper-wrapper");

const swiperSearch = new Swiper(".search-results", {
  slidesPerView: 4,
  spaceBetween: 19,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperSearchDisplay = document.querySelector(".search-results");

const fetchSearchData = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false`,
    options
  );
  const data = await res.json();
  const results = data.results;
  console.log(results);
  searchWrapper.innerHTML = "";
  results.forEach((element) => {
    swiperSlides(searchWrapper, element.poster_path);
  });
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

searchInput.addEventListener("change", () => {
  inputValue = searchInput.value;
  searchInput.value = "";
  results.innerText = `Results for "${inputValue}"`;
  swiperSearchDisplay.style.display = "block";
  fetchSearchData();
});

/* const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
const title = "original_title";
const overview = "overview";
const vote = "vote_average";
const year = "release_date";
const genreID = "genre_ids"; */

/* LATEST */
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
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=primary_release_date.desc`,
    options
  );
  const data = await res.json();
  const results = data.results;
  console.log(results);
  results.forEach((element) => {
    swiperSlides(latestWrapper, element.poster_path);
  });
};

fetchLatestData();

/* GENRE */
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
    swiperSlides(genreWrapper, element.poster_path);
  });
};

const genreMenu = document.querySelector(".genres-menu ul");
const genreName = document.querySelector(".genres-list");
let genreID = 35;
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
