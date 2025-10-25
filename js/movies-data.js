// Catálogo base de películas para JabesFilms.
// Cada entrada incluye información resumida y reseñas iniciales
// que se utilizan tanto en el listado principal como en la página de detalle.

window.moviesData = [
  {
    id: "dune-part-two",
    title: "Dune: Parte Dos",
    originalTitle: "Dune: Part Two",
    releaseDate: "2024-02-28",
    runtime: 166,
    rating: 4.8,
    ratingCount: 13245,
    featured: true,
    trendingRank: 5,
    genres: ["Ciencia ficcion", "Aventura"],
    tagline: "El destino de Arrakis se decide en la arena.",
    synopsis:
      "Paul Atreides se une a Chani y a los Fremen en una cruzada por la libertad de Arrakis, mientras enfrenta visiones profeticas y la responsabilidad de un linaje destinado a cambiar el universo.",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop: "https://www.susangranger.com/wp-content/uploads/2024/03/dune.jpg",
    trailer: "https://www.youtube.com/embed/YdhPAyApRQ4?si=PsGhCaEQCaBak2k8",
    studios: ["Legendary Pictures", "Warner Bros."],
    cast: [
      { name: "Timothee Chalamet", role: "Paul Atreides" },
      { name: "Zendaya", role: "Chani" },
      { name: "Rebecca Ferguson", role: "Lady Jessica" },
      { name: "Austin Butler", role: "Feyd-Rautha" }
    ],
    reviews: [
      {
        author: "Rafael Mendoza",
        rating: 5,
        date: "2024-03-05T10:30:00Z",
        content:
          "Villeneuve entrega una secuela colosal. Las batallas son espectaculares y el arco de Paul impacta de verdad."
      },
      {
        author: "Eliana Costa",
        rating: 4,
        date: "2024-03-07T18:50:00Z",
        content:
          "Visualmente abrumadora y con un ritmo mejor que la primera. Solo queria un poco mas de tiempo para los secundarios."
      }
    ]
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    releaseDate: "2023-07-21",
    runtime: 181,
    rating: 4.7,
    ratingCount: 18450,
    featured: false,
    trendingRank: 2,
    genres: ["Drama", "Historia"],
    tagline: "El mundo cambia para siempre.",
    synopsis:
      "La compleja vida de J. Robert Oppenheimer, el fisico teorico detras del Proyecto Manhattan, entre la genialidad cientifica y el peso etico de la bomba atomica.",
    poster: "https://m.media-amazon.com/images/M/MV5BNTFlZDI1YWQtMTVjNy00YWU1LTg2YjktMTlhYmRiYzQ3NTVhXkEyXkFqcGc@._V1_FMjpg_UX880_.jpg",
    backdrop: "https://images.squarespace-cdn.com/content/v1/5d781378751c4a68f33aecfc/1690454948409-LS94DMCQKQVAIZVQP2OH/facebook-banner.jpg?format=2500w",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
    studios: ["Syncopy", "Universal Pictures"],
    cast: [
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer" },
      { name: "Emily Blunt", role: "Kitty Oppenheimer" },
      { name: "Robert Downey Jr.", role: "Lewis Strauss" },
      { name: "Florence Pugh", role: "Jean Tatlock" }
    ],
    reviews: [
      {
        author: "Lucia Andrade",
        rating: 5,
        date: "2023-08-01T14:12:00Z",
        content:
          "Un retrato absorbente del peso de la responsabilidad. La mezcla de formatos y la musica de Goransson son hipnoticos."
      },
      {
        author: "Sergio Gutierrez",
        rating: 4,
        date: "2023-08-03T09:25:00Z",
        content:
          "Magnifica interpretacion de Murphy y un montaje que mantiene la tension todo el tiempo."
      }
    ]
  },
  {
    id: "barbie",
    title: "Barbie",
    originalTitle: "Barbie",
    releaseDate: "2023-07-21",
    runtime: 114,
    rating: 4.2,
    ratingCount: 21560,
    featured: false,
    trendingRank: 3,
    genres: ["Comedia", "Fantasia"],
    tagline: "Vivir en Barbieland es ser perfecto... hasta que deja de serlo.",
    synopsis:
      "Barbie y Ken viven una vida perfecta en Barbieland, pero comienzan a cuestionar su existencia y se embarcan en un viaje al mundo real para entender que significa ser humano.",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    backdrop: "https://www.thebanner.org/sites/default/files/styles/article_detail_header/public/2023-08/MM-1197%20Barbie.jpg?itok=ETezpk0b",
    trailer: "https://www.youtube.com/embed/zh4KhVSMwtQ?si=IQz7WiQ7BD5PGEit",
    studios: ["LuckyChap Entertainment", "Warner Bros."],
    cast: [
      { name: "Margot Robbie", role: "Barbie estereotipica" },
      { name: "Ryan Gosling", role: "Ken" },
      { name: "America Ferrera", role: "Gloria" },
      { name: "Simu Liu", role: "Ken" }
    ],
    reviews: [
      {
        author: "Paula Zuleta",
        rating: 4,
        date: "2023-07-25T16:00:00Z",
        content:
          "Greta Gerwig construye una satira con mucho corazon. El discurso final es poderoso sin dejar de ser divertido."
      }
    ]
  },
  {
    id: "spider-man-across-the-spider-verse",
    title: "Spider-Man: A Través del Spider-Verso",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    releaseDate: "2023-06-02",
    runtime: 140,
    rating: 4.9,
    ratingCount: 25980,
    featured: true,
    trendingRank: 4,
    genres: ["Animacion", "Accion", "Aventura"],
    tagline: "Miles Morales regresa para la siguiente aventura del Spider-Verso.",
    synopsis:
      "Miles Morales viaja por el multiverso junto a Gwen Stacy y un nuevo equipo de Spider-personas para detener a un enemigo que amenaza a cada realidad.",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop: "https://cdn.mallmarina.cl/mallmarina/uploads/2023/05/GM-GRAFICA-850X480.jpg",
    trailer: "https://www.youtube.com/embed/shW9i6k8cB0",
    studios: ["Sony Pictures Animation", "Marvel Entertainment"],
    cast: [
      { name: "Shameik Moore", role: "Miles Morales (voz)" },
      { name: "Hailee Steinfeld", role: "Gwen Stacy (voz)" },
      { name: "Oscar Isaac", role: "Miguel O'Hara (voz)" },
      { name: "Issa Rae", role: "Jessica Drew (voz)" }
    ],
    reviews: [
      {
        author: "Jorge Rubio",
        rating: 5,
        date: "2023-06-05T11:45:00Z",
        content:
          "Una explosion visual que redefine la animacion de super heroes. El cliffhanger deja ansias de la siguiente parte."
      },
      {
        author: "Natalia Caballero",
        rating: 5,
        date: "2023-06-07T20:15:00Z",
        content:
          "La relacion entre Miles y Gwen es el corazon de una aventura sublime."
      }
    ]
  },
  {
    id: "guardians-of-the-galaxy-vol-3",
    title: "Guardianes de la Galaxia Vol. 3",
    originalTitle: "Guardians of the Galaxy Vol. 3",
    releaseDate: "2023-05-05",
    runtime: 150,
    rating: 4.5,
    ratingCount: 19870,
    featured: true,
    genres: ["Accion", "Ciencia ficcion"],
    tagline: "Una ultima cancion para la tripulacion del Milano.",
    synopsis:
      "Peter Quill debe reunir de nuevo a su equipo para defender el universo y proteger a uno de los suyos mientras se enfrentan a un pasado oscuro y a un nuevo villano.",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    backdrop: "https://cdn.colombia.com/sdi/2023/03/31/guardianes-de-la-galaxia-3-filtran-el-nuevo-poster-de-la-proxima-pelicula-de-marvel-studios-1132598-1.jpg",
    trailer: "https://www.youtube.com/embed/u3V5KDHRQvk",
    studios: ["Marvel Studios"],
    cast: [
      { name: "Chris Pratt", role: "Peter Quill / Star-Lord" },
      { name: "Zoe Saldana", role: "Gamora" },
      { name: "Karen Gillan", role: "Nebula" },
      { name: "Bradley Cooper", role: "Rocket (voz)" }
    ],
    reviews: [
      {
        author: "Mateo Rincon",
        rating: 4,
        date: "2023-05-10T13:05:00Z",
        content:
          "James Gunn entrega un cierre emotivo para los Guardianes. La historia de Rocket es devastadora."
      }
    ]
  },
  {
    id: "killers-of-the-flower-moon",
    title: "Superman",
    originalTitle: "Superman",
    releaseDate: "2025-07-07",
    runtime: 206,
    rating: 4.4,
    ratingCount: 11230,
    featured: true,
    genres: ["Crimen", "Drama", "Historia"],
    tagline: "Un superhéroe, se reconcilia con su herencia y su educación humana. Es la encarnación de la verdad, la justicia y un mañana mejor en un mundo que ve la bondad como algo anticuado.",
    synopsis:
      "Un superhéroe, se reconcilia con su herencia y su educación humana. Es la encarnación de la verdad, la justicia y un mañana mejor en un mundo que ve la bondad como algo anticuado.",
    poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5kpHGfBNwXEl1mnr2LkSRjRIe1oqKe5VxbbVk42niymTQVzYR",
    backdrop: "https://www.film-nerd.com/wp-content/uploads/2025/07/superman-banner.jpg",
    trailer: "https://www.youtube.com/embed/0X_kBulSMjQ?si=vtbYiNc8QRP9fslT",
    studios: ["Apple Studios", "Paramount Pictures"],
    cast: [
      { name: "Leonardo DiCaprio", role: "Ernest Burkhart" },
      { name: "Lily Gladstone", role: "Mollie Burkhart" },
      { name: "Robert De Niro", role: "William Hale" },
      { name: "Jesse Plemons", role: "Tom White" }
    ],
    reviews: [
      {
        author: "Carlos Castro Cuello",
        rating: 4,
        date: "2025-07-07T19:40:00Z",
        content:
          "Scorsese firma un drama contundente con actuaciones memorables y un ritmo que no decae pese a la duracion."
      }
    ]
  },
  {
    id: "the-batman",
    title: "The Batman",
    originalTitle: "The Batman",
    releaseDate: "2022-03-04",
    runtime: 176,
    rating: 4.3,
    ratingCount: 23210,
    featured: true,
    genres: ["Accion", "Misterio"],
    tagline: "La venganza toma la noche en Ciudad Gotica.",
    synopsis:
      "En su segundo ano luchando contra el crimen, Batman se enfrenta a Enigma, un asesino en serie que apunta a la elite de Gotica mientras deja pistas en escena.",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop: "https://i.redd.it/tg4l2g0pl1e81.jpg",
    trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
    studios: ["DC Films", "Warner Bros."],
    cast: [
      { name: "Robert Pattinson", role: "Bruce Wayne / Batman" },
      { name: "Zoe Kravitz", role: "Selina Kyle" },
      { name: "Paul Dano", role: "Edward Nashton" },
      { name: "Jeffrey Wright", role: "James Gordon" }
    ],
    reviews: [
      {
        author: "Camilo Arias",
        rating: 4,
        date: "2022-03-06T12:00:00Z",
        content:
          "Un thriller detectivesco oscuro y atmosferico. Pattinson sorprende con un Batman introspectivo."
      }
    ]
  },
  {
    id: "past-lives",
    title: "Vidas Pasadas",
    originalTitle: "Past Lives",
    releaseDate: "2023-06-23",
    runtime: 106,
    rating: 4.6,
    ratingCount: 8650,
    featured: false,
    genres: ["Drama", "Romance"],
    tagline: "Dos vidas separadas por un oceano y una pregunta sin responder.",
    synopsis:
      "Dos amigos de la infancia se reencuentran anos despues cuando Nora vive en Nueva York y enfrenta las posibilidades de una vida alternativa junto a Hae Sung.",
    poster: "https://hips.hearstapps.com/hmg-prod/images/poster-vidas-pasadas-6540c5a06cbed.jpg",
    backdrop: "https://cartelescine.wordpress.com/wp-content/uploads/2023/10/vidaspasadasbanner.jpg",
    trailer: "https://www.youtube.com/embed/kA244xewjcI",
    studios: ["A24"],
    cast: [
      { name: "Greta Lee", role: "Nora Moon" },
      { name: "Teo Yoo", role: "Hae Sung" },
      { name: "John Magaro", role: "Arthur Zaturansky" }
    ],
    reviews: [
      {
        author: "Valentina Ponce",
        rating: 5,
        date: "2023-06-28T21:10:00Z",
        content:
          "Una historia delicada sobre las oportunidades perdidas. Emocion pura sin recurrir a grandes gestos."
      }
    ]
  },
  {
    id: "demon-slayer-hashira-training",
    title: "Demon Slayer: Kimetsu no Yaiba - Castillo infinito",
    originalTitle:
      "Demon Slayer Kimetsu no Yaiba The Movie: Infinity Castle",
    releaseDate: "2025-09-17",
    runtime: 110,
    rating: 4.1,
    ratingCount: 7420,
    featured: true,
    trendingRank: 1,
    genres: ["Animacion", "Accion", "Fantasia"],
    tagline: "El Cuerpo de Cazadores de Demonios se enfrenta a los Doce Kizuki restantes antes de enfrentarse a Muzan en el Castillo del Infinito para derrotarlo de una vez por todas.",
    synopsis:
      "El Cuerpo de Cazadores de Demonios se enfrenta a los Doce Kizuki restantes antes de enfrentarse a Muzan en el Castillo del Infinito para derrotarlo de una vez por todas.",
    poster: "https://preview.redd.it/poster-for-demon-slayer-kimetsu-no-yaiba-infinity-castle-v0-6qt67lko12me1.jpeg?width=1080&crop=smart&auto=webp&s=1bbc71d89426ba3c12bf43b879d5b5079d0a8344",
    backdrop: "https://static.cinepolis.com/marcas/4dx/imagenes/slide/15/2025911125436183.jpg",
    trailer: "https://www.youtube.com/embed/1iBnWJKbvHI?si=TVxhF54opekK-wmZ",
    studios: ["ufotable", "Aniplex"],
    cast: [
      { name: "Natsuki Hanae", role: "Tanjiro Kamado (voz)" },
      { name: "Akari Kito", role: "Nezuko Kamado (voz)" },
      { name: "Hiro Shimono", role: "Zenitsu Agatsuma (voz)" },
      { name: "Yoshitsugu Matsuoka", role: "Inosuke Hashibira (voz)" }
    ],
    reviews: [
      {
        author: "Laura Barbosa",
        rating: 4,
        date: "2025-09-25T19:00:00Z",
        content:
          "La animacion de ufotable no decepciona y el adelanto del nuevo arco deja con ganas de mas."
      },
      {
        author: "Diego Rivas",
        rating: 5,
        date: "2025-09-27T12:15:00Z",
        content:
          "Gran repaso de la saga de la Aldea de los Herreros y un cierre emocionante para Tanjiro antes del entrenamiento Hashira."
      }
    ]
  }
];
