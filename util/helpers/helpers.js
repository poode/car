const bcrypt = require('bcrypt');

const {
  carTypes,
  serviceTypes,
  contactUsReason,
  endOrderReasonTypes,
  permissionTypes,
  roleTypes,
} = require('../../config/db').db;

/**
 * @param {*} password and plain string
 * @returns {*} hashed password
 */
async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}


/**
 * this method used to return valus inside lookup tables
 * @param {*} req
 * @param {*} res
 */
async function getList(req, res) {
  const carTypeList = await carTypes.findAll({ attributes: ['id', 'carType'], order: [['id']] });
  const serviceTypeList = await serviceTypes.findAll({
    attributes: ['id', 'serviceType', 'servicePrice', 'estimatedTime'], order: [['id']],
  });
  const contactUsReasonList = await contactUsReason.findAll({ attributes: ['id', 'reasonType'], order: [['id']] });
  const endOrderReasonList = await endOrderReasonTypes.findAll({ attributes: ['id', 'endOrderReason'], order: [['id']] });
  const permissionTypeList = await permissionTypes.findAll({ attributes: ['id', 'permissionType'], order: [['id']] });
  const roleTypeList = await roleTypes.findAll({ attributes: ['id', 'roleType'], order: [['id']] });
  return res.json({
    carTypeList,
    serviceTypeList,
    endOrderReasonList,
    contactUsReasonList,
    permissionTypeList,
    roleTypeList,
  });
}

module.exports = {
  bcryptPassword,
  getList,
};
