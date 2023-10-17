const router = require("express").Router();
const Movie = require("../models/Movie");
const movies = require("../movies.json");

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0; // 0 means first page
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating"; //sort according to user input or default according to rating
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(",")); // split when multiple genres are given e.g GET /movies?genre=Action,Adventure

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]); // split user input e.g GET /movies?sort=releaseDate,desc => sort = ["releaseDate", "desc"];

    let sortBy = {};
    // creates a property in the sortBy object with a key that's based on the first element (sort[0]). sort[1] is used as the value to assign to the key sortBy[sort[0]].
    // sortBy will be { "releaseDate": "desc" }
    if (sort.length >= 1) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc"; // Default sorting by key "rating" in ascending order with value asc
    }

    // find by "name" field matches a regular expression pattern specified by search variable with case-insensitive matching
    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit) // skips a certain number of documents based on the page number and the number of items per page (indicated by limit)
      .limit(limit); // the number of movies returned to a specified number

    const totalMoviesByGenre = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      totalMoviesByGenre,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// used to add dummy data from movies.json
/* const insertMovies = async () => {
  try {
    const docs = await Movie.insertMany(movies);
    return Promise.resolve(docs);
  } catch (err) {
    return Promise.reject(err);
  }
};

insertMovies()
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err)); */

module.exports = router;
