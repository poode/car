const {
  returnAllUsers,
  findUserByIdOrMobile,
  limitedUsers,
  RegisterUser,
  findUserByIdOrMobileAndDelete,
  verifyUser,
  validateSchemaAndMobile,
} = require('../../../services/user.service');

const { User } = require('../models/user');
const jsonUserSchema = require('../schema/user.json');
const verificationSchema = require('../schema/verification.json');
const smsVerificationSchema = require('../schema/smsVerificationSchema.json');
const { validateMobileOrId } = require('../../../util/helpers/validation');
const { sms } = require('../../../util/sms/sendSMS');
// const { logger } = require('../../../config/logger');

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

  async getLimited(req, res, next) {
    const userPaging = await limitedUsers(this.User, req);
    if (userPaging.message) return next(userPaging);
    return res.json(userPaging);
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
    const validationResult = await validateSchemaAndMobile(jsonUserSchema, req);
    if (validationResult.error) return next(validationResult.error);

    const { error, user } = await RegisterUser(this.User, req);
    if (error) return next(error);
    return res.json(user);
  }

  async getVerified(req, res, next) {
    const validationResult = await validateSchemaAndMobile(verificationSchema, req);
    if (validationResult.error) return next(validationResult.error);

    const { error, user } = await verifyUser(this.User, req);
    if (error) return next(error);
    return res.json({ verified: true, user });
  }

  async sendSmsVerification(req, res, next) {
    const validationResult = await validateSchemaAndMobile(smsVerificationSchema, req);
    if (validationResult.error) return next(validationResult.error);

    const user = await this.User.find({
      where: { mobile: req.body.mobile },
      attributes: ['verification', 'verified'],
    });

    if (!user) return next({ message: `mobile number ${req.body.mobile} is not in our database`, status: 404 });

    if (user.verified) return next({ message: `mobile number ${req.body.mobile} is already verified`, status: 422 });

    const message = `The verification code is: [${user.verification}] for mobile [${req.body.mobile}]
    this message generated automatically using Slack APIs as a mock sms`;
    const { sent, error } = await sms(message);

    if (error) return next(error);
    return res.json({ mobile: `sms sent to ${req.body.mobile}. sms ID: ${sent}` });
  }

  // this method is for admins to get verification numbers
  async getVerificationNumberByMobile(req, res, next) {
    const validationResult = await validateSchemaAndMobile(smsVerificationSchema, req);
    if (validationResult.error) return next(validationResult.error);

    const verificationKey = await this.User.find({
      where: { mobile: req.body.mobile },
      attributes: ['verification'],
    });

    return res.json({ mobile: Number(req.body.mobile), verificationNumber: verificationKey.verification, message: 'this endpoint is for admins only' });
  }

  /**
   * @TODO once I get what user info needed will edit DB and start
   * implementing this method
   */
  // async function updateUser(params) {
  // }

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
