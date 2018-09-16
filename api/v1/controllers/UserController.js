const _ = require('lodash');

const {
  bcryptPassword,
  getUserByMobile,
  returnAllUsers,
  findUserByIdOrMobile,
} = require('../../../services/user.service');

const { findOrCreate } = require('../../../util/helpers/ormFunctions');
const { pagination } = require('../../../util/PaginationUtil/pagination');
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
    const limitedUsersList = await pagination(this.User, req);
    const userList = limitedUsersList.data.map(user => _.pick(user, ['id', 'username', 'email', 'mobile', 'verified', 'createdAt', 'updatedAt']));
    const userListMapped = _.pick(limitedUsersList, ['object', 'data', 'has_more', 'pageCount', 'itemCount', 'pages']);
    userListMapped.data = userList;
    res.json(userListMapped);
  }

  async getUser(req, res, next) {
    const validateNumber = validateMobileOrId(req.params, req);
    if (!validateNumber) {
      const error = { message: 'please enter valid number', status: 400 };
      return next(error);
    }
    const user = await findUserByIdOrMobile(this.User, req);
    return res.json(user);
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
    const hashedPassword = await bcryptPassword(req.body.password);
    // find user by mobile if not found create it.
    const options = {
      where: { mobile: req.body.mobile },
      defaults: {
        username: req.body.username,
        password: hashedPassword,
        mobile: req.body.mobile,
      },
    };
    const { modelInstance, modelExists } = await findOrCreate(this.User, options);
    if (modelExists === false) {
      return next({ message: 'mobile number already exists, forgot your password?', status: 409 });
    }
    const findUser = await getUserByMobile(this.User, modelInstance.mobile);
    return res.json(findUser);
  }
}

module.exports = new UserController();
