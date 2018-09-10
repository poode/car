const { Movie, validateMovie, genreSchema } = require('../models/movie');
const { Genre } = require('../models/genre');

const { pagination } = require('../../../util/PaginationUtil/pagination');


class MovieController {
  constructor() {
    this.Movie = Movie;
    this.Genre = Genre;
    this.validateMovie = validateMovie;
    this.genreSchema = genreSchema;
  }

  async index(req, res) {
    const movieList = await this.Movie.find();
    return res.json(movieList);
  }

  async getLimited(req, res) {
    const limitedMoviesList = await pagination(this.Movie, req);
    res.json(limitedMoviesList);
  }

  async getMovie(req, res) {
    const movie = await this.Movie.findOne({ _id: req.params.id });
    return res.json(movie);
  }

  async create(req, res, next) {
    const { error } = this.validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await this.Genre.findOne({ _id: req.body.genre.id });
    if (!genre) {
      next({ message: 'no genre found with this ID' });
      return false;
    }
    const MovieInstance = new Movie({
      title: req.body.title,
      genre: {
        id: req.body.genre.id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    const result = await MovieInstance.save();
    return res.json(result);
  }

  async update(req, res) {
    const { error } = this.validateMovie(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id }, req.body, { new: true },
    );
    return res.json(movie);
  }

  async destroy(req, res) {
    const movie = await this.Movie.findOneAndDelete({ _id: req.params.id });
    return res.json(movie);
  }
}

module.exports = new MovieController();
