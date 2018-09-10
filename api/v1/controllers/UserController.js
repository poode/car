const _ = require('lodash');
const Joi = require('joi');

const { pagination } = require('../../../util/PaginationUtil/pagination');
const { validateUser, JoiUserSchema, bcryptPassword } = require('../../../services/user.service');
const { User } = require('../models/user');


function validateEmail(email) {
  const JoiEmailSchema = {
    email: Joi.string().email().required(),
  };
  return Joi.validate({ email }, JoiEmailSchema);
}

class UserController {
  /**
   *
   * @param function validation
   * @param validationSchema JoiSchema
   * @param DBModel model
   */
  constructor(validation, JoiSchema, model) {
    if (validation && JoiSchema && model) {
      this.validation = validation;
      this.JoiSchema = JoiSchema;
      this.model = model;
    } else {
      this.validation = validateUser;
      this.JoiSchema = JoiUserSchema;
      this.model = User;
    }
  }

  async index(req, res) {
    const users = await this.model.find();
    const usersFound = _.map(users, user => ({ _id: user.id, name: user.name, email: user.email }));
    res.json(usersFound);
  }

  async getLimited(req, res) {
    const limitedUsersList = await pagination(this.model, req);
    const userList = limitedUsersList.data.map(user => _.pick(user, ['_id', 'name', 'email']));
    const userListMapped = _.pick(limitedUsersList, ['object', 'data', 'has_more', 'pageCount', 'itemCount', 'pages']);
    userListMapped.data = userList;
    res.json(userListMapped);
  }

  async getUser(req, res, next) {
    const { error } = validateEmail(req.params.email);
    if (error) {
      next({ message: 'invalid email', status: 400 });
      return false;
    }
    const user = await this.model.findOne({ email: req.params.email });
    if (!user) {
      next({ message: 'there is no email like this stored', status: 400 });
      return false;
    }
    return res.json(_.pick(user, ['_id', 'name', 'email']));
  }

  async create(req, res) {
    const { error } = this.validation(req.body);
    if (error) return res.status('400').send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(304).send(`The Email ${req.body.email} is already registered`);
    }

    user = new User(_.pick(req.body, ['name', 'email']));
    user.password = await bcryptPassword(req.body.password);

    await user.save();
    return res.status('201').json(_.pick(user, ['_id', 'name', 'email']));
  }
}

module.exports = new UserController();
