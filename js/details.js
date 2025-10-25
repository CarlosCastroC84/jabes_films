// Lógica de detalle de película: render dinámico, favoritos y comentarios.
(function () {
  if (!Array.isArray(window.moviesData)) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  const movie = window.moviesData.find((item) => item.id === movieId);

  const IMAGE_FALLBACKS = {
    poster: "img/placeholders/poster-default.svg",
    backdrop: "img/placeholders/backdrop-default.svg",
  };

  const contentSection = document.querySelector("[data-movie-content]");
  const errorState = document.querySelector("[data-error-state]");
  const breadcrumbTitle = document.querySelector("[data-breadcrumb-title]");
  const breadcrumbContainer = document.querySelector("[data-breadcrumb]");

  if (!movie) {
    const heroSection = document.querySelector(".movie-detail-hero");
    if (heroSection) {
      heroSection.style.display = "none";
    }
    if (contentSection) {
      contentSection.style.display = "none";
    }
    if (errorState) {
      errorState.style.display = "block";
    }
    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = "Película no encontrada";
    }
    return;
  }

  if (contentSection) {
    contentSection.style.display = "block";
  }
  if (errorState) {
    errorState.style.display = "none";
  }

  const heroBackground = document.querySelector("[data-hero-background]");
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroTagline = document.querySelector("[data-hero-tagline]");
  const heroGenres = document.querySelector("[data-hero-genres]");
  const heroYear = document.querySelector("[data-hero-year]");

  const posterElement = document.querySelector("[data-movie-poster]");
  const favoriteButton = document.querySelector("[data-favorite-button]");
  const ratingValue = document.querySelector("[data-movie-rating]");
  const ratingCount = document.querySelector("[data-movie-rating-count]");
  const titleElement = document.querySelector("[data-movie-title]");
  const originalTitleElement = document.querySelector(
    "[data-movie-original-title]"
  );
  const releaseElement = document.querySelector("[data-movie-release]");
  const runtimeElement = document.querySelector("[data-movie-runtime]");
  const runtimeAsideElement = document.querySelector(
    "[data-movie-runtime-aside]"
  );
  const genresElement = document.querySelector("[data-movie-genres]");
  const synopsisElement = document.querySelector("[data-movie-synopsis]");
  const synopsisFullElement = document.querySelector(
    "[data-movie-synopsis-full]"
  );
  const studiosElement = document.querySelector("[data-movie-studios]");
  const ratingLabelElement = document.querySelector(
    "[data-movie-rating-label]"
  );
  const ratingScoreElement = document.querySelector(
    "[data-movie-rating-score]"
  );
  const trailerButton = document.querySelector("[data-trailer-button]");
  const trailerContainer = document.querySelector("[data-trailer-container]");
  const trailerEmbed = document.querySelector("[data-trailer-embed]");
  const castList = document.querySelector("[data-movie-cast]");
  const relatedContainer = document.querySelector("[data-related-movies]");

  function ensureBackground(element, imageUrl) {
    if (!element) {
      return;
    }
    const imageType = element.getAttribute("data-image-type") || "poster";
    const fallback = IMAGE_FALLBACKS[imageType] || IMAGE_FALLBACKS.poster;
    element.setAttribute("data-bg-managed", "true");

    if (!imageUrl) {
      element.style.backgroundImage = `url(${fallback})`;
      element.classList.add("has-fallback");
      return;
    }

    const loader = new Image();
    loader.onload = () => {
      element.style.backgroundImage = `url(${imageUrl})`;
      element.classList.remove("has-fallback");
    };
    loader.onerror = () => {
      element.style.backgroundImage = `url(${fallback})`;
      element.classList.add("has-fallback");
    };
    loader.src = imageUrl;
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function formatDateTime(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  function formatRating(value) {
    return Number.parseFloat(value || 0).toFixed(1);
  }

  function formatRuntime(minutes) {
    if (!Number.isFinite(minutes)) {
      return " — ";
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours
      ? `${hours}h ${mins.toString().padStart(2, "0")}m`
      : `${mins} min`;
  }

  function normalizeTrailerUrl(url) {
    const fallback = { embed: "", watch: "" };
    if (!url) {
      return fallback;
    }

    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace("www.", "");

      if (host === "youtu.be") {
        const videoId = parsed.pathname.replace("/", "");
        if (!videoId) {
          return fallback;
        }
        return {
          embed: `https://www.youtube.com/embed/${videoId}`,
          watch: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        const videoId =
          parsed.searchParams.get("v") ||
          parsed.pathname.replace("/embed/", "").replace("/", "");
        if (!videoId) {
          return fallback;
        }
        return {
          embed: `https://www.youtube.com/embed/${videoId}`,
          watch: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }

      if (host.endsWith("youtube.com")) {
        const videoId =
          parsed.searchParams.get("v") ||
          parsed.pathname.replace("/embed/", "").replace("/", "");
        if (!videoId) {
          return fallback;
        }
        return {
          embed: `https://www.youtube.com/embed/${videoId}`,
          watch: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }

      return { embed: url, watch: url };
    } catch (error) {
      console.warn("No se pudo normalizar el trailer", error);
      return fallback;
    }
  }

  // Hero content
  if (heroBackground) {
    heroBackground.setAttribute("data-setbg", movie.backdrop || "");
  }
  ensureBackground(heroBackground, movie.backdrop);
  if (heroTitle) {
    heroTitle.textContent = movie.title;
  }
  if (heroTagline) {
    heroTagline.textContent = movie.tagline || movie.synopsis || "";
  }
  if (heroGenres) {
    heroGenres.textContent = movie.genres.slice(0, 3).join(" · ");
  }
  if (heroYear) {
    heroYear.textContent = new Date(movie.releaseDate).getFullYear();
  }

  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = movie.title;
  }
  if (breadcrumbContainer) {
    breadcrumbContainer.setAttribute("aria-label", `Estás en ${movie.title}`);
  }

  if (posterElement) {
    posterElement.setAttribute("data-setbg", movie.poster || "");
  }
  ensureBackground(posterElement, movie.poster);

  if (titleElement) {
    titleElement.textContent = movie.title;
  }
  if (originalTitleElement) {
    originalTitleElement.textContent = movie.originalTitle
      ? `Título original: ${movie.originalTitle}`
      : "";
  }
  const formattedDate = formatDate(movie.releaseDate);
  if (releaseElement) {
    releaseElement.textContent = formattedDate;
  }
  const runtimeLabel = formatRuntime(movie.runtime);
  if (runtimeElement) {
    runtimeElement.textContent = runtimeLabel;
  }
  if (runtimeAsideElement) {
    runtimeAsideElement.textContent = runtimeLabel;
  }
  if (genresElement) {
    genresElement.textContent = movie.genres.join(", ");
  }
  if (synopsisElement) {
    synopsisElement.textContent = movie.synopsis;
  }
  if (synopsisFullElement) {
    synopsisFullElement.textContent = movie.synopsis;
  }
  if (studiosElement) {
    studiosElement.textContent = (movie.studios || []).join(", ");
  }
  if (ratingLabelElement) {
    ratingLabelElement.textContent = "Promedio global";
  }
  const trailerUrls = normalizeTrailerUrl(movie.trailer);

  if (trailerButton) {
    trailerButton.href = trailerUrls.watch || trailerUrls.embed || "#";
    trailerButton.style.display = movie.trailer ? "inline-flex" : "none";
  }
  if (trailerEmbed) {
    if (trailerUrls.embed) {
      trailerEmbed.src = trailerUrls.embed;
    } else if (trailerContainer) {
      trailerContainer.innerHTML =
        "<p>No tenemos un tráiler disponible por el momento.</p>";
    }
  }

  if (castList) {
    castList.innerHTML = (movie.cast || [])
      .map(
        (member) => `
        <li>
          <span class="movie-detail__cast__name">${member.name}</span>
          <span class="movie-detail__cast__role">${member.role || ""}</span>
        </li>
      `
      )
      .join("");
  }

  // Favoritos
  const favoritesStorageKey = "jabesFilmsFavorites";

  function readFavorites() {
    try {
      const stored = localStorage.getItem(favoritesStorageKey);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("No se pudieron leer las favoritas almacenadas", error);
      return [];
    }
  }

  let favorites = new Set(readFavorites());

  function persistFavorites() {
    localStorage.setItem(
      favoritesStorageKey,
      JSON.stringify(Array.from(favorites))
    );
  }

  function updateFavoriteButton() {
    if (!favoriteButton) {
      return;
    }
    const icon = favoriteButton.querySelector("i");
    const label = favoriteButton.querySelector("span");
    const isFavorite = favorites.has(movie.id);
    favoriteButton.classList.toggle("is-favorite", isFavorite);
    favoriteButton.setAttribute(
      "aria-pressed",
      isFavorite ? "true" : "false"
    );
    if (icon) {
      icon.className = `fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`;
    }
    if (label) {
      label.textContent = isFavorite
        ? "En tus favoritas"
        : "Agregar a favoritas";
    }
  }

  favoriteButton?.addEventListener("click", () => {
    if (favorites.has(movie.id)) {
      favorites.delete(movie.id);
    } else {
      favorites.add(movie.id);
    }
    persistFavorites();
    updateFavoriteButton();
  });

  updateFavoriteButton();

  // Comentarios
  const commentsList = document.querySelector("[data-comments-list]");
  const commentsEmpty = document.querySelector("[data-comments-empty]");
  const commentForm = document.querySelector("[data-comment-form]");
  const commentsStorageKey = "jabesFilmsComments";

  function readStoredComments() {
    try {
      const stored = localStorage.getItem(commentsStorageKey);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && Array.isArray(parsed[movie.id])) {
        return parsed[movie.id];
      }
      return [];
    } catch (error) {
      console.error("No se pudieron leer los comentarios almacenados", error);
      return [];
    }
  }

  function persistStoredComments(list) {
    try {
      const stored = localStorage.getItem(commentsStorageKey);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[movie.id] = list;
      localStorage.setItem(commentsStorageKey, JSON.stringify(parsed));
    } catch (error) {
      console.error("No se pudieron guardar los comentarios", error);
    }
  }

  const initialComments = (movie.reviews || []).map((review, index) => ({
    author: review.author || "Invitado",
    rating: Number(review.rating) || 0,
    content: review.content || "",
    date: review.date || new Date(Date.now() - index * 60000).toISOString(),
    source: "initial",
  }));

  let storedComments = readStoredComments().map((review) => ({
    ...review,
    source: "user",
  }));

  function getAllComments() {
    return initialComments
      .concat(storedComments)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }

  function renderComments() {
    const comments = getAllComments();
    if (!commentsList || !commentsEmpty) {
      return;
    }

    if (!comments.length) {
      commentsList.innerHTML = "";
      commentsEmpty.style.display = "block";
      return;
    }

    commentsEmpty.style.display = "none";
    commentsList.innerHTML = comments
      .map((comment) => {
        const stars = Array.from({ length: 5 })
          .map(
            (_, index) =>
              `<i class="fa ${
                index < comment.rating ? "fa-star" : "fa-star-o"
              }"></i>`
          )
          .join("");
        return `
          <article class="movie-comments__item">
            <header class="movie-comments__item__header">
              <h6>${escapeHtml(comment.author)}</h6>
              <div class="movie-comments__item__rating">${stars}</div>
            </header>
            <span class="movie-comments__item__date">${formatDateTime(
              comment.date
            )}</span>
            <p>${escapeHtml(comment.content)}</p>
          </article>
        `;
      })
      .join("");
  }

  function updateRatingSummary() {
    const storedCount = storedComments.length;
    const storedTotal = storedComments.reduce(
      (accumulator, comment) => accumulator + Number(comment.rating || 0),
      0
    );
    const baseCount = Number(movie.ratingCount) || 0;
    const aggregatedCount = baseCount + storedCount;
    const aggregatedRating = aggregatedCount
      ? (Number(movie.rating || 0) * baseCount + storedTotal) / aggregatedCount
      : Number(movie.rating || 0);

    if (ratingValue) {
      ratingValue.textContent = formatRating(aggregatedRating);
    }
    if (ratingScoreElement) {
      ratingScoreElement.textContent = `${formatRating(aggregatedRating)} / 5`;
    }
    if (ratingCount) {
      ratingCount.textContent = `Basado en ${aggregatedCount.toLocaleString(
        "es-ES"
      )} reseñas`;
    }
  }

  commentForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(commentForm);
    const author = (formData.get("author") || "").toString().trim();
    const rating = Number(formData.get("rating"));
    const content = (formData.get("content") || "").toString().trim();

    if (!author || !rating || !content) {
      return;
    }

    const newComment = {
      author,
      rating,
      content,
      date: new Date().toISOString(),
      source: "user",
    };

    storedComments = [newComment].concat(storedComments);
    persistStoredComments(storedComments);
    renderComments();
    updateRatingSummary();
    commentForm.reset();
    const ratingField = commentForm.querySelector('select[name="rating"]');
    if (ratingField) {
      ratingField.value = "";
      if (typeof $(ratingField).niceSelect === "function") {
        $(ratingField).niceSelect("update");
      }
    }
  });

  renderComments();
  updateRatingSummary();

  // Películas relacionadas
  if (relatedContainer) {
    const relatedMovies = window.moviesData
      .filter(
        (item) =>
          item.id !== movie.id &&
          item.genres.some((genre) => movie.genres.includes(genre))
      )
      .sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      )
      .slice(0, 3);

    if (!relatedMovies.length) {
      relatedContainer.innerHTML =
        "<p>No hay recomendaciones relacionadas por ahora.</p>";
    } else {
      relatedContainer.innerHTML = relatedMovies
        .map(
          (item) => `
          <a class="movie-detail__aside__item" href="movie-details.html?id=${item.id}">
            <span class="movie-detail__aside__item__title">${item.title}</span>
            <span class="movie-detail__aside__item__meta">${new Date(
              item.releaseDate
            ).getFullYear()} · ${item.genres.slice(0, 2).join(", ")}</span>
          </a>
        `
        )
        .join("");
    }
  }
})();

function escapeHtml(value) {
  if (value == null) {
    return "";
  }
  return value
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
