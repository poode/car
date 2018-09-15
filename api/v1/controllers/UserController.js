const _ = require('lodash');

const validate = require('../../../util/helpers/validation');
const { pagination } = require('../../../util/PaginationUtil/pagination');
const { validateUser, JoiUserSchema } = require('../../../services/user.service');
const { User } = require('../models/user');

class UserController {
  /**
   *
   * @param function validation
   * @param validationSchema JoiSchema
   * @param DBModel model
   */
  // constructor() {
    
  //  }

  async index(req, res) {
    // const users = await this.model.find();
    // const usersFound = _.map(users, user => ({ _id: user.id, name: user.name, email: user.email }));
    // res.json(usersFound);
  }

  async getLimited(req, res) {
    // const limitedUsersList = await pagination(this.model, req);
    // const userList = limitedUsersList.data.map(user => _.pick(user, ['_id', 'name', 'email']));
    // const userListMapped = _.pick(limitedUsersList, ['object', 'data', 'has_more', 'pageCount', 'itemCount', 'pages']);
    // userListMapped.data = userList;
    // res.json(userListMapped);
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

  async create(req, res, next) {
    // const { errors } = await validate(jsonUserSchema, req.body);
    // if (errors) return next(errors);
    User.create(req.body)
        .then(user => res.json(user)).catch(err => {
          const error = {
            message: JSON.stringify(err),
          }
          next(error)
        });
        
   
    // console.log(User);
    // return res.json();
  }
}

module.exports = new UserController();
