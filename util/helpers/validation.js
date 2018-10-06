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
        errorArray.push({ field: `${JSON.stringify(err.params)} ${err.message}` });
      } else {
        errorArray.push({ field: `${err.dataPath.replace('.', '')} ${err.message}` });
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
    const mobileSAPattern = /((^9665[0345689])(\d{7}$))|((^96657([012678])(\d{6}$)))/;
    const isValidMobile = mobileSAPattern.test(mobile);
    if (!isValidMobile) {
      return false;
    }
  }
  return true;
}

/**
 *
 *
 * @param {any} schema JSON validation schema
 * @param {any} req
 * @returns result with error if not valid input request or valid with true
 */
async function validateSchemaAndMobile(schema, req) {
  const mobileSAPattern = /((^9665[0345689])(\d{7}$))|((^96657([012678])(\d{6}$)))/;
  const result = {
    valid: false,
    errorFound: '',
  };

  // validation.
  const errors = await validate(schema, req.body);
  if (errors.length) {
    result.errorFound = { message: errors, status: 400 };
    return result;
  }

  const isValidKSANumber = mobileSAPattern.test(req.body.mobile.toString());

  if (!isValidKSANumber) {
    result.errorFound = { message: 'please enter a valid Saudi Arabia mobile number', status: 400 };
    return result;
  }
  result.valid = true;
  return result;
}


module.exports = {
  validate,
  validateMobileOrId,
  validateSchemaAndMobile,
};
