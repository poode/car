const { model, Schema } = require('mongoose');

const Joi = require('joi');

const joiGenreSchema = {
  name: Joi.string().min(3).required(),
};

function validateGenre(genre) {
  return Joi.validate(genre, joiGenreSchema);
}

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});


const Genre = model.call(require('mongoose'), 'Genre', genreSchema);

module.exports = {
  Genre,
  genreSchema,
  validateGenre,
  joiGenreSchema,
};
