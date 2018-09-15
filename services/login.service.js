const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { User } = require('../api/v1/models/user');

// const JoiLoginSchema = {
//   email: Joi.string().email().required(),
//   password: Joi.string().min(5).max(255).required(),
// };

// function validation(credentials) {
//   return Joi.validate(credentials, JoiLoginSchema);
// }

// async function tokenGenerator(id, email) {
//   const token = await jwt.sign({ id, email }, process.env.APP_SECRET, { expiresIn: '24h' });
//   return token;
// }

// async function authentication(req, res, next) {
//   const { error } = validation(req.body);
//   if (error) {
//     const err = { message: error.details[0].message, status: 400 };
//     next(err);
//     return false;
//   }

//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     const err = { message: 'user is not found in our databases', status: 404 };
//     next(err);
//     return false;
//   }

//   const match = await bcrypt.compare(req.body.password, user.password);
//   if (!match) {
//     const err = { message: 'the entered email or password is invalid!', status: 500 };
//     next(err);
//     return false;
//   }
//   const token = await tokenGenerator(user.id, user.email);
//   return res.header('x-auth-token', token).send({
//     authenticated: true,
//     userId: user.id,
//     userEmail: user.email,
//     token,
//   });
// }

// module.exports = {
//   authentication,
// };
