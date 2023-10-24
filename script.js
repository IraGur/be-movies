const authToken =
   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjMzZmVjMzdkNmY1NDdmNzg3MzJkNDgzMjM0OTc5MiIsInN1YiI6IjY1MzZmMDUxN2ZjYWIzMDBlYWIzNjZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sSLd5OYhBjUpPC56oCiKWchQ1NtN9mgwaUpJHy0X-z8";
const apiKey = "c233fec37d6f547f78732d4832349792";

const apiRequestoptions = {
   method: "GET",
   headers: { accept: "application/json", Authorization: authToken },
};

const searchSection = document.querySelector("search-result");

const getTemplate = (options) => `
    <div class="swiper-slide">
        <img src="https://image.tmdb.org/t/p/original${
           options.poster_path
        }" alt="src"/>
        <div>
            <h3>${options.title}</h3>
            <p>${options.release_date}</p>
            <p>${options.genre_ids.join(", ")}</p>
        </div>
    </div>`;

const initSwiper = (selector) => {
   new Swiper(selector, {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
      // Navigation arrows
      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
   });
};

const getApiData = async (url) => {
   const response = await fetch(url, apiRequestoptions);
   return response.json();
};

const loadLatestReleases = () => {};
const loadByGenre = () => {};

const loadSearchReuslt = async (query) => {
   const searchResults = document.querySelector(".search-results");
   const swiperWrapper = searchResults.querySelector(".swiper-wrapper");
   const searchResultsHeader = document.querySelector(".search-result h2");

   //reset elements
   searchResults.style.display = "none";
   swiperWrapper.innerHTML = "";
   searchResultsHeader.innerHTML = "";

   const searchData = await getApiData(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
   );

   if (searchData.results.length > 0) {
      searchData.results.forEach((movie) => {
         searchResultsHeader.innerText = `Results for ${query}`;
         swiperWrapper.innerHTML += getTemplate({
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
         });
      });

      initSwiper(".search-results");

      setTimeout(() => {
         searchResults.style.display = "block";
      });
   }
};

const onSearchClick = (e) => {
   const form =
      e.target.tagName === "I"
         ? e.target.parentElement.parentElement
         : e.target.parentElement;
   const inputValue = form.querySelector("input").value;

   if (inputValue.trim()) {
      loadSearchReuslt(inputValue);
   } else {
      alert("enter a value");
   }
};
