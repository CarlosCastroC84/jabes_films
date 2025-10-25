// Lógica específica de la página de inicio: hero dinámico, filtros, favoritos y listados.
(function () {
  if (!Array.isArray(window.moviesData)) {
    return;
  }

  const IMAGE_FALLBACKS = {
    poster: "img/placeholders/poster-default.svg",
    backdrop: "img/placeholders/backdrop-default.svg",
  };

  const movies = window.moviesData.slice();
  const moviesSortedByDate = movies
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  const heroSlider = document.querySelector("[data-hero-slider]");
  const movieGrid = document.querySelector("[data-movie-grid]");
  const emptyState = document.querySelector("[data-empty-state]");
  const resultsCount = document.querySelector("[data-results-count]");
  const trendingList = document.querySelector("[data-trending-list]");
  const favoritesList = document.querySelector("[data-favorites-list]");
  const favoritesEmpty = document.querySelector("[data-favorites-empty]");
  const clearFavoritesBtn = document.querySelector("[data-clear-favorites]");

  const searchInput = document.getElementById("movie-search-input");
  const overlaySearch = document.getElementById("search-input");
  const searchSwitch = document.querySelector(".search-switch");
  const genreFilter = document.getElementById("genre-filter");
  const yearFilter = document.getElementById("year-filter");
  const resetFiltersBtn = document.querySelector("[data-reset-filters]");

  const favoritesStorageKey = "jabesFilmsFavorites";
  let favorites = new Set(readFavorites());

  function readFavorites() {
    try {
      const stored = localStorage.getItem(favoritesStorageKey);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("No se pudieron cargar las favoritas almacenadas", error);
      return [];
    }
  }

  function persistFavorites() {
    localStorage.setItem(
      favoritesStorageKey,
      JSON.stringify(Array.from(favorites))
    );
  }

  function applyBackground(element, primary) {
    if (!element) {
      return;
    }
    const imageType = element.getAttribute("data-image-type") || "poster";
    const fallback = IMAGE_FALLBACKS[imageType] || IMAGE_FALLBACKS.poster;
    element.setAttribute("data-bg-managed", "true");

    if (!primary) {
      element.style.backgroundImage = `url(${fallback})`;
      element.classList.add("has-fallback");
      return;
    }

    const loader = new Image();
    loader.onload = () => {
      element.style.backgroundImage = `url(${primary})`;
      element.classList.remove("has-fallback");
    };
    loader.onerror = () => {
      element.style.backgroundImage = `url(${fallback})`;
      element.classList.add("has-fallback");
    };
    loader.src = primary;
  }

  function ensureBackgrounds(scope) {
    const elements = (scope || document).querySelectorAll(".set-bg");
    elements.forEach((element) => {
      const bg = element.getAttribute("data-setbg");
      applyBackground(element, bg);
    });
  }

  function formatRating(value) {
    return Number.parseFloat(value || 0).toFixed(1);
  }

  function buildHero() {
    if (!heroSlider) {
      return;
    }

    const highlighted = moviesSortedByDate
      .filter((movie) => movie.featured)
      .sort(
        (a, b) =>
          (a.trendingRank || Number.MAX_SAFE_INTEGER) -
          (b.trendingRank || Number.MAX_SAFE_INTEGER)
      );

    heroSlider.innerHTML = highlighted
      .map((movie) => {
        const year = new Date(movie.releaseDate).getFullYear();
        return `
          <div class="hero__items set-bg" data-setbg="${movie.backdrop}" data-image-type="backdrop">
            <div class="row">
              <div class="col-lg-6">
                <div class="hero__text">
                  <div class="label">${movie.genres.slice(0, 2).join(" · ")}</div>
                  <h2>${movie.title}</h2>
                  <p>${movie.tagline || movie.synopsis}</p>
                  <ul class="hero__meta">
                    <li><i class="fa fa-calendar"></i> ${year}</li>
                    <li><i class="fa fa-clock-o"></i> ${movie.runtime} min</li>
                    <li><i class="fa fa-star"></i> ${formatRating(movie.rating)}</li>
                  </ul>
                  <a href="movie-details.html?id=${movie.id}">
                    <span>Ver reseña</span> <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    ensureBackgrounds(heroSlider);
  }

  function buildFilterOptions() {
    if (genreFilter) {
      const genres = new Set();
      movies.forEach((movie) => {
        (movie.genres || []).forEach((genre) => genres.add(genre));
      });
      Array.from(genres)
        .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }))
        .forEach((genre) => {
          const option = document.createElement("option");
          option.value = genre;
          option.textContent = genre;
          genreFilter.appendChild(option);
        });
    }

    if (yearFilter) {
      const years = new Set(
        movies.map((movie) =>
          new Date(movie.releaseDate).getFullYear().toString()
        )
      );
      Array.from(years)
        .sort((a, b) => Number(b) - Number(a))
        .forEach((year) => {
          const option = document.createElement("option");
          option.value = year;
          option.textContent = year;
          yearFilter.appendChild(option);
        });
    }
  }

  function updateResultsCount(count) {
    if (!resultsCount) {
      return;
    }
    const label = count === 1 ? "película" : "películas";
    resultsCount.textContent = `${count} ${label} disponibles`;
  }

  function renderMovieList(list) {
    if (!movieGrid) {
      return;
    }

    movieGrid.innerHTML = list
      .map((movie) => {
        const releaseYear = new Date(movie.releaseDate).getFullYear();
        const genres = movie.genres.length
          ? movie.genres.slice(0, 2).join(", ")
          : "Cine";
        const synopsisSource = movie.synopsis || "";
        const synopsis =
          synopsisSource.length > 180
            ? `${synopsisSource.slice(0, 177)}...`
            : synopsisSource;
        const isFavorite = favorites.has(movie.id);

        return `
          <div class="col-lg-6 col-md-6 col-sm-6">
            <article class="movie-card">
              <div class="movie-card__poster product__item__pic set-bg" data-setbg="${movie.poster}" data-image-type="poster">
                <div class="movie-card__badge"><i class="fa fa-star"></i> ${formatRating(
                  movie.rating
                )}</div>
                <button type="button" class="movie-card__favorite ${
                  isFavorite ? "is-favorite" : ""
                }" data-favorite-toggle="${movie.id}" aria-label="${
          isFavorite ? "Quitar de favoritas" : "Agregar a favoritas"
        }">
                  <i class="fa ${isFavorite ? "fa-heart" : "fa-heart-o"}"></i>
                </button>
              </div>
              <div class="product__item__text">
                <ul>
                  <li>${releaseYear}</li>
                  <li>${genres}</li>
                </ul>
                <h5><a href="movie-details.html?id=${movie.id}">${movie.title}</a></h5>
                <p>${synopsis}</p>
                <a class="movie-card__link" href="movie-details.html?id=${
                  movie.id
                }">Ver reseña completa <span class="fa fa-angle-right"></span></a>
              </div>
            </article>
          </div>
        `;
      })
      .join("");

    ensureBackgrounds(movieGrid);
    attachFavoriteListeners();

    if (emptyState) {
      emptyState.style.display = list.length ? "none" : "block";
    }

    updateResultsCount(list.length);
  }

  function renderTrending() {
    if (!trendingList) {
      return;
    }

    const trending = moviesSortedByDate
      .filter((movie) => movie.featured)
      .sort(
        (a, b) =>
          (a.trendingRank || Number.MAX_SAFE_INTEGER) -
          (b.trendingRank || Number.MAX_SAFE_INTEGER)
      );

    trendingList.innerHTML = trending
      .map((movie, index) => {
        const year = new Date(movie.releaseDate).getFullYear();
        const topGenres = movie.genres.length
          ? movie.genres.slice(0, 2).join(", ")
          : "Cine";
        return `
          <div class="product__sidebar__view__item set-bg" data-setbg="${movie.backdrop}" data-image-type="backdrop">
            <div class="movie-trending__rank">#${index + 1}</div>
            <div class="movie-trending__meta">
              <h5><a href="movie-details.html?id=${movie.id}">${movie.title}</a></h5>
              <span>${year} · ${topGenres}</span>
            </div>
          </div>
        `;
      })
      .join("");

    ensureBackgrounds(trendingList);
  }

  function renderFavorites() {
    if (!favoritesList || !favoritesEmpty || !clearFavoritesBtn) {
      return;
    }

    const favoriteMovies = moviesSortedByDate.filter((movie) =>
      favorites.has(movie.id)
    );

    favoritesList.innerHTML = favoriteMovies
      .map((movie) => {
        const year = new Date(movie.releaseDate).getFullYear();
        const primaryGenre = movie.genres[0] || "Cine";
        return `
          <div class="movie-favorites__item">
            <div class="movie-favorites__thumb set-bg" data-setbg="${movie.poster}" data-image-type="poster"></div>
            <div class="movie-favorites__info">
              <ul>
                <li>${year}</li>
                <li>${primaryGenre}</li>
              </ul>
              <h5><a href="movie-details.html?id=${movie.id}">${movie.title}</a></h5>
              <span><i class="fa fa-star"></i> ${formatRating(movie.rating)}</span>
            </div>
          </div>
        `;
      })
      .join("");

    ensureBackgrounds(favoritesList);

    const hasFavorites = favoriteMovies.length > 0;
    favoritesEmpty.style.display = hasFavorites ? "none" : "block";
    clearFavoritesBtn.disabled = !hasFavorites;
  }

  function toggleFavorite(movieId) {
    if (!movieId) {
      return;
    }

    if (favorites.has(movieId)) {
      favorites.delete(movieId);
    } else {
      favorites.add(movieId);
    }

    persistFavorites();
    renderFavorites();
    updateFavoriteButtons();
  }

  function attachFavoriteListeners() {
    document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
      button.removeEventListener("click", handleFavoriteClick);
      button.addEventListener("click", handleFavoriteClick);
    });
  }

  function handleFavoriteClick(event) {
    const movieId = event.currentTarget.getAttribute("data-favorite-toggle");
    toggleFavorite(movieId);
  }

  function updateFavoriteButtons() {
    document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
      const movieId = button.getAttribute("data-favorite-toggle");
      const icon = button.querySelector("i");
      const isFavorite = favorites.has(movieId);
      button.classList.toggle("is-favorite", isFavorite);
      button.setAttribute(
        "aria-label",
        isFavorite ? "Quitar de favoritas" : "Agregar a favoritas"
      );
      if (icon) {
        icon.className = `fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`;
      }
    });
  }

  function applyFilters() {
    const searchTerm = (searchInput?.value || "")
      .trim()
      .toLowerCase();
    const genre = genreFilter?.value || "all";
    const year = yearFilter?.value || "all";

    const filtered = moviesSortedByDate.filter((movie) => {
      const matchesGenre =
        genre === "all" || movie.genres.some((item) => item === genre);
      const movieYear = new Date(movie.releaseDate).getFullYear().toString();
      const matchesYear = year === "all" || movieYear === year;
      if (!searchTerm) {
        return matchesGenre && matchesYear;
      }
      const textBank = [
        movie.title,
        movie.originalTitle,
        movie.tagline,
        movie.synopsis,
        movie.genres.join(" "),
        movie.cast.map((member) => member.name).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = textBank.includes(searchTerm);
      return matchesGenre && matchesYear && matchesSearch;
    });

    renderMovieList(filtered);
  }

  function syncOverlaySearch() {
    if (!overlaySearch || !searchInput) {
      return;
    }
    overlaySearch.value = searchInput.value;
    overlaySearch.focus();
  }

  function bindEvents() {
    searchInput?.addEventListener("input", () => {
      overlaySearch.value = searchInput.value;
      applyFilters();
    });

    overlaySearch?.addEventListener("input", () => {
      searchInput.value = overlaySearch.value;
      applyFilters();
    });

    overlaySearch?.form?.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    genreFilter?.addEventListener("change", applyFilters);
    yearFilter?.addEventListener("change", applyFilters);

    resetFiltersBtn?.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }
      if (overlaySearch) {
        overlaySearch.value = "";
      }
      if (genreFilter) {
        genreFilter.value = "all";
      }
      if (yearFilter) {
        yearFilter.value = "all";
      }
      applyFilters();
    });

    clearFavoritesBtn?.addEventListener("click", () => {
      favorites.clear();
      persistFavorites();
      renderFavorites();
      updateFavoriteButtons();
    });

    if (searchSwitch && overlaySearch) {
      searchSwitch.addEventListener("click", () => {
        syncOverlaySearch();
      });
    }

    window.addEventListener("storage", (event) => {
      if (event.key === favoritesStorageKey) {
        favorites = new Set(readFavorites());
        renderFavorites();
        updateFavoriteButtons();
      }
    });
  }

  buildHero();
  buildFilterOptions();
  renderTrending();
  renderFavorites();
  bindEvents();
  applyFilters();
})();
