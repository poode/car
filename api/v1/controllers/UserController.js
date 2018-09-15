const _ = require('lodash');

const { bcryptPassword } = require('../../../services/user.service');
const { pagination } = require('../../../util/PaginationUtil/pagination');
const { User } = require('../models/user');
const jsonUserSchema = require('../schema/user.json');
const validate = require('../../../util/helpers/validation');

class UserController {
  /**
   * @param DBModel User
   */
  constructor() {
    this.User = User;
  }

  async index(req, res) {
    const users = await this.User.findAll();
    const usersFound = _.map(users, user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.json(usersFound);
  }

  async getLimited(req, res) {
    const limitedUsersList = await pagination(this.User, req);
    const userList = limitedUsersList.data.map(user => _.pick(user, ['id', 'username', 'email', 'mobile', 'verified', 'createdAt', 'updatedAt']));
    const userListMapped = _.pick(limitedUsersList, ['object', 'data', 'has_more', 'pageCount', 'itemCount', 'pages']);
    userListMapped.data = userList;
    res.json(userListMapped);
  }

  async getUser(req, res, next) {
    // const { error } = validateEmail(req.params.email);
    // if (error) {
    //   next({ message: 'invalid email', status: 400 });
    //   return false;
    // }
    // const user = await this.model.findOne({ email: req.params.email });
    // if (!user) {
    //   next({ message: 'there is no email like this stored', status: 400 });
    //   return false;
    // }
    // return res.json(_.pick(user, ['_id', 'name', 'email']));
  }

  /**
   * req.body = {username, mobile, password}.
   * res.json() sends {id, username, mobiles, verified, createdAt, updatedAt}.
   * next() sends error to error middleware error.
   * errors:
   *   1- maybe validation error.
   *   2- the user registering with same mobile otherwise the user object will be created
   *   if mobile not exists in database.
   */
  async create(req, res, next) {
    // validation.
    const errors = await validate(jsonUserSchema, req.body);
    if (errors.length) return next({ message: errors, status: 400 });
    // hashing password before saving to database.
    const { password } = req.body;
    const hashedPassword = await bcryptPassword(password);
    // find user by mobile if not found create it.
    const user = await this.User.findOrCreate({
      where: { mobile: req.body.mobile },
      defaults: {
        username: req.body.username,
        password: hashedPassword,
        mobile: req.body.mobile,
      },
    });
    if (user[1] === false) {
      return next({ message: 'mobile number already exists, forgot your password?', status: 409 });
    }
    return res.json(_.pick(user[0], ['id', 'username', 'mobile', 'verified', 'createdAt', 'updatedAt']));
  }
}

module.exports = new UserController();
