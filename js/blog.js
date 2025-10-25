// Página de blog: genera publicaciones rápidas a partir de las películas registradas.
(function () {
  if (!Array.isArray(window.moviesData)) {
    return;
  }

  const IMAGE_FALLBACKS = {
    backdrop: "img/placeholders/backdrop-default.svg",
  };

  const blogGrid = document.querySelector("[data-blog-grid]");
  const blogEmpty = document.querySelector("[data-blog-empty]");

  function applyBackground(element, primary) {
    if (!element) {
      return;
    }
    const imageType = element.getAttribute("data-image-type") || "backdrop";
    const fallback = IMAGE_FALLBACKS[imageType] || IMAGE_FALLBACKS.backdrop;
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function buildExcerpt(movie) {
    if (movie.reviews && movie.reviews.length) {
      const first = movie.reviews[0].content || "";
      return first.length > 140 ? `${first.slice(0, 137)}...` : first;
    }
    return movie.synopsis.length > 140
      ? `${movie.synopsis.slice(0, 137)}...`
      : movie.synopsis;
  }

  const posts = window.moviesData
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 9);

  if (!posts.length || !blogGrid) {
    if (blogEmpty) {
      blogEmpty.style.display = "block";
    }
    return;
  }

  const articles = posts
    .map((movie) => {
      const releaseDate = formatDate(movie.releaseDate);
      const excerpt = buildExcerpt(movie);
      return `
        <div class="col-lg-4 col-md-6 col-sm-6">
          <article class="blog-card set-bg" data-setbg="${movie.backdrop}" data-image-type="backdrop">
            <div class="blog-card__content">
              <span class="blog-card__date"><i class="icon_calendar"></i> ${releaseDate}</span>
              <h4><a href="movie-details.html?id=${movie.id}">${movie.title}</a></h4>
              <p>${excerpt}</p>
              <a class="blog-card__link" href="movie-details.html?id=${movie.id}">Leer reseña completa <span class="fa fa-angle-right"></span></a>
            </div>
          </article>
        </div>
      `;
    })
    .join("");

  blogGrid.innerHTML = articles;
  ensureBackgrounds(blogGrid);
  if (blogEmpty) {
    blogEmpty.style.display = "none";
  }
})();
