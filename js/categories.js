// Página de categorías: agrupa las películas por género y permite ordenar los resultados.
(function () {
  if (!Array.isArray(window.moviesData)) {
    return;
  }

  const IMAGE_FALLBACKS = {
    poster: "img/placeholders/poster-default.svg",
  };

  const genreList = document.querySelector("[data-genre-list]");
  const categoryTitle = document.querySelector("[data-category-title]");
  const categoryDescription = document.querySelector(
    "[data-category-description]"
  );
  const categoryGrid = document.querySelector("[data-category-grid]");
  const categoryEmpty = document.querySelector("[data-category-empty]");
  const categoryCount = document.querySelector("[data-category-count]");
  const sortSelect = document.querySelector("[data-sort-select]");

  const favoritesStorageKey = "jabesFilmsFavorites";

  const allGenres = Array.from(
    window.moviesData.reduce((accumulator, movie) => {
      (movie.genres || []).forEach((genre) => accumulator.add(genre));
      return accumulator;
    }, new Set())
  ).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

  let activeGenre = "all";
  let sortMode = sortSelect ? sortSelect.value : "recent";
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

  function formatMovieCard(movie) {
    const releaseYear = new Date(movie.releaseDate).getFullYear();
    const genres = movie.genres.length
      ? movie.genres.slice(0, 2).join(", ")
      : "Cine";
    const synopsisSource = movie.synopsis || "";
    const synopsis =
      synopsisSource.length > 160
        ? `${synopsisSource.slice(0, 157)}...`
        : synopsisSource;
    const isFavorite = favorites.has(movie.id);

    return `
      <div class="col-lg-4 col-md-6 col-sm-6">
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
  }

  function buildGenreList() {
    if (!genreList) {
      return;
    }
    const genreItems = [
      `<li><button type="button" class="categories__list__item is-active" data-genre="all">Todos</button></li>`,
    ].concat(
      allGenres.map(
        (genre) =>
          `<li><button type="button" class="categories__list__item" data-genre="${genre}">${genre}</button></li>`
      )
    );

    genreList.innerHTML = genreItems.join("");
    genreList
      .querySelectorAll("[data-genre]")
      .forEach((button) =>
        button.addEventListener("click", handleGenreClick)
      );
  }

  function handleGenreClick(event) {
    const selectedGenre = event.currentTarget.getAttribute("data-genre");
    if (!selectedGenre || selectedGenre === activeGenre) {
      return;
    }
    activeGenre = selectedGenre;
    updateActiveGenreButton();
    renderMovies();
  }

  function updateActiveGenreButton() {
    if (!genreList) {
      return;
    }
    genreList.querySelectorAll("[data-genre]").forEach((button) => {
      const buttonGenre = button.getAttribute("data-genre");
      button.classList.toggle("is-active", buttonGenre === activeGenre);
    });

    if (categoryTitle) {
      categoryTitle.textContent =
        activeGenre === "all" ? "Todos los géneros" : activeGenre;
    }
    if (categoryDescription) {
      categoryDescription.textContent =
        activeGenre === "all"
          ? "Descubre las películas disponibles agrupadas por género dentro de nuestro catálogo."
          : `Mostrando películas etiquetadas dentro del género ${activeGenre}.`;
    }
  }

  function sortMovies(list) {
    if (sortMode === "rating") {
      return list
        .slice()
        .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }
    if (sortMode === "alpha") {
      return list
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
    }
    // Default: recent
    return list
      .slice()
      .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }

  function renderMovies() {
    if (!categoryGrid) {
      return;
    }
    const filtered = window.moviesData.filter((movie) => {
      if (activeGenre === "all") {
        return true;
      }
      return movie.genres.some((genre) => genre === activeGenre);
    });

    const sorted = sortMovies(filtered);

    if (!sorted.length) {
      categoryGrid.innerHTML = "";
      if (categoryEmpty) {
        categoryEmpty.style.display = "block";
      }
      if (categoryCount) {
        categoryCount.textContent = "0 películas";
      }
      return;
    }

    categoryGrid.innerHTML = sorted.map((movie) => formatMovieCard(movie)).join("");
    ensureBackgrounds(categoryGrid);
    attachFavoriteListeners();
    if (categoryEmpty) {
      categoryEmpty.style.display = "none";
    }
    if (categoryCount) {
      const label = sorted.length === 1 ? "película" : "películas";
      categoryCount.textContent = `${sorted.length} ${label}`;
    }
  }

  function attachFavoriteListeners() {
    document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
      button.removeEventListener("click", handleFavoriteToggle);
      button.addEventListener("click", handleFavoriteToggle);
    });
  }

  function handleFavoriteToggle(event) {
    const movieId = event.currentTarget.getAttribute("data-favorite-toggle");
    if (!movieId) {
      return;
    }

    if (favorites.has(movieId)) {
      favorites.delete(movieId);
    } else {
      favorites.add(movieId);
    }

    localStorage.setItem(
      favoritesStorageKey,
      JSON.stringify(Array.from(favorites))
    );
    renderMovies();
  }

  sortSelect?.addEventListener("change", (event) => {
    sortMode = event.target.value;
    renderMovies();
  });

  window.addEventListener("storage", (event) => {
    if (event.key === favoritesStorageKey) {
      favorites = new Set(readFavorites());
      renderMovies();
    }
  });

  buildGenreList();
  updateActiveGenreButton();
  renderMovies();
})();
