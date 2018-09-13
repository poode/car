const Ajv = require('ajv');

module.exports = function validate(schema, data) {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, data);
  return valid;
};
