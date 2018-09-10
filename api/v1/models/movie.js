const { model, Schema } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const joiGenreSchema = {
  id: Joi.objectId(),
};

const genreSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const joiMovieSchema = {
  title: Joi.string().min(3).required(),
  genre: Joi.object(joiGenreSchema).required(),
  numberInStock: Joi.number().required(),
  dailyRentalRate: Joi.number().required(),
};

function validateMovie(movie) {
  return Joi.validate(movie, joiMovieSchema);
}

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  genre: {
    type: [genreSchema],
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});
const Movie = model.call(require('mongoose'), 'Movie', movieSchema);

module.exports = {
  Movie,
  movieSchema,
  validateMovie,
  joiMovieSchema,
};
