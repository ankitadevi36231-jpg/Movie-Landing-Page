/* ============================================================
   REELVION — MOVIE DATABASE (template data)
   All posters/backdrops are verified TMDB CDN images.
   Replace entries or add new ones following the same shape.
   ============================================================ */
const IMG = "https://image.tmdb.org/t/p/";

const MOVIES = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    runtime: "2h 47m",
    certified: "PG-13",
    quality: "4K",
    genres: ["Sci-Fi", "Adventure"],
    featured: true,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh"],
    poster: IMG + "w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: IMG + "w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    year: 2024,
    rating: 8.0,
    runtime: "2h 8m",
    certified: "R",
    quality: "4K",
    genres: ["Action", "Comedy", "Sci-Fi"],
    featured: true,
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Matthew Macfadyen", "Morena Baccarin"],
    poster: IMG + "w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop: IMG + "w1280/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    description: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit up again with an even more reluctant Wolverine.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "inside-out-2",
    title: "Inside Out 2",
    year: 2024,
    rating: 7.6,
    runtime: "1h 37m",
    certified: "PG",
    quality: "HD",
    genres: ["Animation", "Family", "Comedy"],
    featured: false,
    director: "Kelsey Mann",
    cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman", "Tony Hale", "Phyllis Smith"],
    poster: IMG + "w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop: IMG + "w1280/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    description: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust aren't sure how to feel when Anxiety shows up — and it looks like she's not alone.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.1,
    runtime: "3h 1m",
    certified: "R",
    quality: "4K",
    genres: ["Drama", "History", "Thriller"],
    featured: true,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    poster: IMG + "w500/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    backdrop: IMG + "w1280/4IrOGHD5hIbsnz42j0Qw3TPua0P.jpg",
    description: "The story of J. Robert Oppenheimer, the brilliant physicist whose Manhattan Project led the development of the atomic bomb during World War II — and whose conscience would define the century that followed.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "barbie",
    title: "Barbie",
    year: 2023,
    rating: 7.0,
    runtime: "1h 54m",
    certified: "PG-13",
    quality: "HD",
    genres: ["Comedy", "Adventure", "Fantasy"],
    featured: false,
    director: "Greta Gerwig",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon", "Michael Cera"],
    poster: IMG + "w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    backdrop: IMG + "w1280/nHf61UzkfFno5X1ofIhugCPus2R.jpg",
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "furiosa-a-mad-max-saga",
    title: "Furiosa: A Mad Max Saga",
    year: 2024,
    rating: 7.6,
    runtime: "2h 29m",
    certified: "R",
    quality: "4K",
    genres: ["Action", "Adventure", "Sci-Fi"],
    featured: true,
    director: "George Miller",
    cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke", "Alyla Browne", "Lachy Hulme"],
    poster: IMG + "w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    backdrop: IMG + "w1280/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
    description: "As the world falls, young Furiosa is snatched from the Green Place of Many Mothers into the hands of a great biker horde led by the warlord Dementus. Sweeping through the wasteland, the two tyrants wage war for dominance — and Furiosa must survive many trials as she finds her way home.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "godzilla-x-kong",
    title: "Godzilla x Kong: The New Empire",
    year: 2024,
    rating: 7.4,
    runtime: "1h 55m",
    certified: "PG-13",
    quality: "HD",
    genres: ["Action", "Sci-Fi", "Adventure"],
    featured: false,
    director: "Adam Wingard",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens", "Kaylee Hottle", "Alex Ferns"],
    poster: IMG + "w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdrop: IMG + "w1280/gvLG3Fnznkxl4SmYfcK8gUuqxM8.jpg",
    description: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence — and our own. The latest chapter delves into the histories of these Titans, their origins, and the mysteries of Skull Island.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "kung-fu-panda-4",
    title: "Kung Fu Panda 4",
    year: 2024,
    rating: 7.1,
    runtime: "1h 34m",
    certified: "PG",
    quality: "HD",
    genres: ["Animation", "Action", "Family"],
    featured: false,
    director: "Mike Mitchell",
    cast: ["Jack Black", "Awkwafina", "Viola Davis", "Dustin Hoffman", "Bryan Cranston"],
    poster: IMG + "w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    backdrop: IMG + "w1280/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    description: "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he must train a new kung fu practitioner — and confront a villain called the Chameleon, who conjures villains from the past.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "the-batman",
    title: "The Batman",
    year: 2022,
    rating: 7.7,
    runtime: "2h 57m",
    certified: "PG-13",
    quality: "4K",
    genres: ["Crime", "Mystery", "Thriller"],
    featured: true,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Colin Farrell", "Andy Serkis"],
    poster: IMG + "w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop: IMG + "w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    year: 2022,
    rating: 8.2,
    runtime: "2h 11m",
    certified: "PG-13",
    quality: "4K",
    genres: ["Action", "Drama"],
    featured: false,
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm", "Glen Powell"],
    poster: IMG + "w500/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    backdrop: IMG + "w1280/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    description: "After more than thirty years of service as one of the Navy's top aviators, Pete \"Maverick\" Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "spider-man-no-way-home",
    title: "Spider-Man: No Way Home",
    year: 2021,
    rating: 8.0,
    runtime: "2h 28m",
    certified: "PG-13",
    quality: "4K",
    genres: ["Action", "Adventure", "Sci-Fi"],
    featured: false,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Willem Dafoe", "Jacob Batalon"],
    poster: IMG + "w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: IMG + "w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "tenet",
    title: "Tenet",
    year: 2020,
    rating: 7.2,
    runtime: "2h 30m",
    certified: "PG-13",
    quality: "HD",
    genres: ["Action", "Thriller", "Sci-Fi"],
    featured: false,
    director: "Christopher Nolan",
    cast: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki", "Kenneth Branagh", "Aaron Taylor-Johnson"],
    poster: IMG + "w500/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg",
    backdrop: IMG + "w1280/mQOUyqDybTqxl73hO5LujCZsM1o.jpg",
    description: "Armed with only one word — Tenet — and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  }
];

/* All genres present in the dataset (drives the filter bar and
   the Categories page). */
const CATEGORIES = ["Action", "Adventure", "Animation", "Comedy", "Crime",
                    "Drama", "Family", "Fantasy", "History", "Mystery",
                    "Sci-Fi", "Thriller"];

/* ---------------- Helper functions -------------------------- */
function getMovie(id) {
  return MOVIES.find(function (m) { return m.id === id; }) || null;
}

function featuredMovies() {
  return MOVIES.filter(function (m) { return m.featured; });
}

function latestMovies() {
  return MOVIES.slice().sort(function (a, b) { return b.year - a.year; });
}

function topRatedMovies() {
  return MOVIES.slice().sort(function (a, b) { return b.rating - a.rating; });
}

function moviesByGenre(genre) {
  if (!genre || genre === "All") return MOVIES;
  return MOVIES.filter(function (m) {
    return m.genres.indexOf(genre) !== -1;
  });
}

function relatedMovies(movie, max) {
  max = max || 6;
  return MOVIES.filter(function (m) {
    return m.id !== movie.id &&
           m.genres.some(function (g) { return movie.genres.indexOf(g) !== -1; });
  }).slice(0, max);
}

/* Shared SVG poster fallback (used when an image fails to load) */
function posterFallback(title) {
  const initials = title.split(" ").map(function (w) { return w.charAt(0); }).join("").slice(0, 3).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#151d2c"/><stop offset="1" stop-color="#0b0f16"/>' +
    "</linearGradient></defs>" +
    '<rect width="300" height="450" fill="url(#g)"/>' +
    '<text x="150" y="215" font-family="Arial" font-size="56" font-weight="bold" fill="#2c3a52" text-anchor="middle">' + initials + "</text>" +
    '<text x="150" y="248" font-family="Arial" font-size="13" fill="#3b4a63" text-anchor="middle">REELVION</text>' +
    "</svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
