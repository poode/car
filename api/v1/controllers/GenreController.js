const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { pagination } = require('../../../util/PaginationUtil/pagination');
const { Genre, validateGenre } = require('../models/genre');

function validateId(id) {
  const JoiGenreSchema = {
    id: Joi.objectId(),
  };
  return Joi.validate(id, JoiGenreSchema);
}

class GenreController {
  constructor() {
    this.Genre = Genre;
    this.validateGenre = validateGenre;
  }

  async index(req, res) {
    const genreList = await this.Genre.find();
    res.json(genreList);
  }

  async getLimited(req, res) {
    const limitedGenresList = await pagination(this.Genre, req);
    res.json(limitedGenresList);
  }

  async getGenre(req, res, next) {
    const { error } = validateId({ id: req.params.id });
    if (error) {
      next({ message: 'invalid ID', status: 400 });
      return false;
    }

    const genre = await this.Genre.findOne({ _id: req.params.id });
    return res.json(genre);
  }

  async create(req, res) {
    const { error } = this.validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const GenreInstance = new Genre(req.body);
    const result = await GenreInstance.save();
    return res.json(result);
  }

  async update(req, res) {
    const { error } = this.validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const genre = await this.Genre.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true },
    );
    return res.json(genre);
  }

  async destroy(req, res) {
    const genre = await this.Genre.findOneAndDelete({ _id: req.params.id });
    return res.json(genre);
  }
}

module.exports = new GenreController();
