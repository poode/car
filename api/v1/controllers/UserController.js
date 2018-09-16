const phone = require('phone');
const {
  returnAllUsers,
  findUserByIdOrMobile,
  limitedUsers,
  createUser,
  findUserByIdOrMobileAndDelete,
} = require('../../../services/user.service');

const { User } = require('../models/user');
const jsonUserSchema = require('../schema/user.json');
const { validate, validateMobileOrId } = require('../../../util/helpers/validation');


class UserController {
  /**
   * @param DBModel User
   */
  constructor() {
    this.User = User;
  }

  async index(req, res) {
    const usersFound = await returnAllUsers(this.User);
    res.json(usersFound);
  }

  async getLimited(req, res) {
    const userPaging = await limitedUsers(this.User, req);
    res.json(userPaging);
  }

  async getUser(req, res, next) {
    const validateNumber = validateMobileOrId(req.params, req);
    if (!validateNumber) {
      const error = { message: 'please enter valid number', status: 400 };
      return next(error);
    }
    const { user, error } = await findUserByIdOrMobile(this.User, req);
    if (error) return next(error);
    return res.json(user);
  }

  async create(req, res, next) {
    // validation.
    const errors = await validate(jsonUserSchema, req.body);
    if (errors.length) return next({ message: errors, status: 400 });
    // Country Code for Kingdom of Saudi Arabia is SAU
    const isPhone = phone(req.body.mobile.toString(), 'SAU');
    if (!isPhone.length) return next({ message: 'please enter a valid Saudi Arabia mobile number', status: 400 });
    const { error, user } = await createUser(this.User, req);
    if (error) return next(error);
    return res.json(user);
  }

  async deleteUser(req, res, next) {
    let message = '';
    const validateNumber = validateMobileOrId(req.params, req);
    if (!validateNumber) {
      let error = '';
      if (req.params.id) error = { message: 'please enter valid id number', status: 400 };
      if (req.params.mobile) error = { message: 'please enter valid mobile number', status: 400 };
      return next(error);
    }
    const { error } = await findUserByIdOrMobileAndDelete(this.User, req);
    if (error) return next(error);
    if (req.params.id) message = { message: `User with given ID: ${req.params.id} deleted successfully` };
    if (req.params.mobile) message = { message: `User with given Mobile: ${req.params.mobile} deleted successfully` };
    return res.json(message);
  }
}

module.exports = new UserController();
