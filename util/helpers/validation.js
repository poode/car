const Ajv = require('ajv');
const isNumber = require('is-number');
const phone = require('phone');
const localize = require('ajv-i18n');
const _ = require('lodash');

const ajv = new Ajv({ allErrors: true });
require('ajv-keywords')(ajv, 'uniqueItemProperties');

/**
 * @param {*} modelSchema
 * @param {*} inputSchema
 * @returns Array of Errors
 */
function validate(modelSchema, inputSchema) {
  const validateSchema = ajv.compile(modelSchema);
  const valid = validateSchema(inputSchema);
  const errorArray = [];
  if (!valid) {
    // @TODO will change en to ar and vice versa based on request local
    localize.en(validateSchema.errors);
    _.map(validateSchema.errors, (err) => {
      if (!err.dataPath) {
        errorArray.push({ fieldRequirements: `${JSON.stringify(err.params)} ${err.message}` });
      } else {
        errorArray.push({ fieldRequirements: `${err.dataPath.replace('.', '')} ${err.message}` });
      }
    });
  }
  return errorArray;
}

/**
 * @param {*} reqParam may be id or mobile number
 * @returns boolean
 */
function validateMobileOrId(reqParam, req) {
  let { id, mobile } = reqParam;
  id = parseInt(id, 0);
  mobile = parseInt(mobile, 0);
  if ((req.params.id && !isNumber(id)) || (req.params.mobile && !isNumber(mobile))) {
    return false;
  }
  if (mobile) {
    // Country Code for Kingdom of Saudi Arabia is SAU
    const isPhone = phone(mobile.toString(), 'SAU');
    if (!isPhone.length) {
      return false;
    }
  }
  return true;
}

module.exports = {
  validate,
  validateMobileOrId,
};
