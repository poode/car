const { model, Schema } = require('mongoose');
const Joi = require('joi');

const joiCustomerSchema = {
  name: Joi.string().min(5).max(50).required(),
  phone: Joi.string().min(5).max(50).required(),
  isGold: Joi.boolean(),
};

function validateCustomer(customer) {
  return Joi.validate(customer, joiCustomerSchema);
}


const customerSchema = new Schema({
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

const Customer = model.call(require('mongoose'), 'Customer', customerSchema);

module.exports = {
  validateCustomer,
  Customer,
  customerSchema,
  joiCustomerSchema,
};
