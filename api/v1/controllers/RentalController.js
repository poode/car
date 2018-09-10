const Fawn = require('fawn');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { pagination } = require('../../../util/PaginationUtil/pagination');
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

function validateId(id) {
  const idSchema = {
    id: Joi.objectId(),
  };
  return Joi.validate(id, idSchema);
}


class GenreController {
  constructor() {
    this.Rental = Rental;
    this.validateRental = validateRental;
    this.Customer = Customer;
    this.Movie = Movie;
    this.Fawn = Fawn;
  }

  async index(req, res) {
    const rentalList = await this.Rental.find();
    return res.json(rentalList);
  }

  async getLimited(req, res) {
    const limitedRentalsList = await pagination(this.Rental, req);
    res.json(limitedRentalsList);
  }

  async getRental(req, res, next) {
    const { error } = validateId({ id: req.params.id });
    if (error) {
      next({ message: 'invalid ID', status: 400 });
      return false;
    }
    const rental = await this.Rental.findOne(req.params.id);
    return res.json(rental);
  }

  async create(req, res, next) {
    const { error } = this.validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customerId = req.body.customer.id;
    const movieId = req.body.movie.id;

    const customer = await this.Customer.findOne({ _id: customerId });
    const movie = await this.Movie.findOne({ _id: movieId });
    if (!customer || !movie) {
      next({ message: 'the entered customer or movie is not listed in our databases', status: 404 });
      return false;
    }

    if (movie.numberInStock <= 0) {
      next({ message: 'this movie is not available for rent now!', status: 202 });
      return false;
    }

    const RentalInstance = new Rental({
      customer: {
        id: customerId,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        id: movieId,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      rentalFee: req.body.rentalFee,
    });

    await new Fawn.Task()
      .save('rentals', RentalInstance)
      .update('movies', {}, {
        $inc: {
          numberInStock: -1,
        },
      })
      .run();
    return res.json(RentalInstance);
  }

  async update(req, res, next) {
    const { error } = this.validateRental(req.body);
    if (error) {
      next({ message: 'bad request', status: 400 });
      return false;
    }

    const customerId = req.body.customer.id;
    const movieId = req.body.movie.id;

    const customer = await this.Customer.findOne({ _id: customerId });
    const movie = await this.Movie.findOne({ _id: movieId });
    if (!customer || !movie) {
      next({ message: 'the entered customer or movie is not listed in our databases', status: 404 });
      return false;
    }

    const rental = await this.Rental.findOneAndUpdate(
      { _id: req.params.id },
      {
        customer: {
          id: customerId,
          name: customer.name,
          isGold: customer.isGold,
          phone: customer.phone,
        },
        movie: {
          id: movieId,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
        rentalFee: req.body.rentalFee,
      },
      { new: true },
    );
    return res.json(rental);
  }

  async destroy(req, res) {
    const rental = await this.Rental.findOneAndDelete({ _id: req.params.id });
    return res.json(rental);
  }
}

module.exports = new GenreController();
