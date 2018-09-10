const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const customerSchema = new mongoose.Schema({
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
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

const joiCustomerSchema = {
  id: Joi.objectId(),
};

const joiMovieSchema = {
  id: Joi.objectId(),
};


const joiRentalSchema = {
  customer: Joi.object(joiCustomerSchema).required(),
  movie: Joi.object(joiMovieSchema).required(),
  rentalFee: Joi.string().required(),
};

function validateRental(rental) {
  return Joi.validate(rental, joiRentalSchema);
}

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = {
  Rental,
  rentalSchema,
  validateRental,
  joiRentalSchema,
};
