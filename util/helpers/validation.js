const Ajv = require('ajv');
const isNumber = require('is-number');
const phone = require('phone');
const localize = require('ajv-i18n');

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
  let errorArray = '';
  if (!valid) {
    // @TODO will change en to ar and vice versa based on request local
    localize.en(validateSchema.errors);
    validateSchema.errors.map((err) => {
      errorArray = [];
      if (!err.dataPath) {
        errorArray.push({ fieldRequirements: `${JSON.stringify(err.params)} ${err.message}` });
      } else {
        errorArray.push({ fieldRequirements: `${err.dataPath} ${err.message}` });
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
  if ((req.path.includes('id') && !isNumber(id)) || (req.path.includes('mobile') && !isNumber(mobile))) {
    return false;
  }
  if (mobile) {
    const idOrMobile = reqParam.toString();
    // Country Code for Kingdom of Saudi Arabia is SAU
    const isPhone = phone(idOrMobile, 'SAU');
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
