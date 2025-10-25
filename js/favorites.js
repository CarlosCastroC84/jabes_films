// Página de favoritas: renderiza las películas guardadas por el usuario.
(function () {
  if (!Array.isArray(window.moviesData)) {
    return;
  }

  const IMAGE_FALLBACKS = {
    poster: "img/placeholders/poster-default.svg",
    backdrop: "img/placeholders/backdrop-default.svg",
  };

  const favoritesGrid = document.querySelector("[data-favorites-grid]");
  const favoritesEmpty = document.querySelector("[data-favorites-empty]");
  const favoritesCount = document.querySelector("[data-favorites-count]");
  const clearButton = document.querySelector("[data-clear-favorites]");

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

  function buildCard(movie) {
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

  function updateCountLabel(count) {
    if (!favoritesCount) {
      return;
    }
    const label = count === 1 ? "título" : "títulos";
    favoritesCount.textContent = `${count} ${label}`;
  }

  function renderFavorites() {
    if (!favoritesGrid) {
      return;
    }
    const favoriteMovies = window.moviesData.filter((movie) =>
      favorites.has(movie.id)
    );

    if (!favoriteMovies.length) {
      favoritesGrid.innerHTML = "";
      if (favoritesEmpty) {
        favoritesEmpty.style.display = "block";
      }
      updateCountLabel(0);
      if (clearButton) {
        clearButton.disabled = true;
      }
      return;
    }

    favoritesGrid.innerHTML = favoriteMovies
      .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
      .map((movie) => buildCard(movie))
      .join("");

    ensureBackgrounds(favoritesGrid);
    attachFavoriteListeners();
    if (favoritesEmpty) {
      favoritesEmpty.style.display = "none";
    }
    updateCountLabel(favoriteMovies.length);
    if (clearButton) {
      clearButton.disabled = false;
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
    persistFavorites();
    renderFavorites();
  }

  clearButton?.addEventListener("click", () => {
    favorites.clear();
    persistFavorites();
    renderFavorites();
  });

  window.addEventListener("storage", (event) => {
    if (event.key === favoritesStorageKey) {
      favorites = new Set(readFavorites());
      renderFavorites();
    }
  });

  renderFavorites();
})();
