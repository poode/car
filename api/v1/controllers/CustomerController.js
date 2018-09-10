const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { pagination } = require('../../../util/PaginationUtil/pagination');
const { Customer, validateCustomer } = require('../models/customer');
const { logger } = require('./../../../config/logger');


function validateId(id) {
  const JoiCustomerSchema = {
    id: Joi.objectId(),
  };
  return Joi.validate(id, JoiCustomerSchema);
}

class CustomerController {
  constructor() {
    this.Customer = Customer;
    this.validateCustomer = validateCustomer;
  }

  async index(req, res) {
    const customerList = await this.Customer.find();
    res.json(customerList);
  }

  async getLimited(req, res) {
    const limitedCustomerList = await pagination(this.Customer, req);
    res.json(limitedCustomerList);
  }

  async getCustomer(req, res, next) {
    const { error } = validateId({ id: req.params.id });
    if (error) {
      next({ message: 'invalid Customer ID', status: 400 });
      return false;
    }

    const customer = await this.Customer.findOne({ _id: req.params.id });
    if (!customer) {
      next({ status: 404, message: 'The Customer with the given ID was not found.' });
      return false;
    }
    return res.json(customer);
  }

  async create(req, res, next) {
    logger.info(`this is request body for customers creation route: ${JSON.stringify(req.body)}`);
    const { error } = this.validateCustomer(req.body);
    if (error) {
      next({ status: 400, message: error.details[0].message });
      return false;
    }
    const result = await new Customer(req.body).save();
    return res.json(result);
  }

  async update(req, res, next) {
    logger.info(`this is request body for customers update route: ${JSON.stringify(req.body)}`);
    const { error } = this.validateCustomer(req.body);
    if (error) {
      next({ status: 404, message: error.details[0].message });
      return false;
    }
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true },
    );
    return res.json(customer);
  }

  async destroy(req, res, next) {
    const customer = await this.Customer.findOneAndDelete({ _id: req.params.id });
    if (!customer) {
      next({ status: 404, message: 'The customer with the given ID was not found.' });
      return false;
    }
    return res.json(customer);
  }
}

module.exports = new CustomerController();
