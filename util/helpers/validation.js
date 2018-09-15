const Ajv = require('ajv');
const localize = require('ajv-i18n');

const ajv = new Ajv({ allErrors: true });
require('ajv-keywords')(ajv, 'uniqueItemProperties');

module.exports = function validate(modelSchema, inputSchema) {
  const validateSchema = ajv.compile(modelSchema);
  const valid = validateSchema(inputSchema);
  const errorArray = [];
  if (!valid) {
    // localize.ar(validateSchema.errors);
    validateSchema.errors.map((err) => {
      if (!err.dataPath) {
        errorArray.push({ fieldRequirments: `${JSON.stringify(err.params)} ${err.message}` });
      } else {
        errorArray.push({ fieldRequirments: `${err.dataPath} ${err.message}` });
      }
    });
  }
  return errorArray;
};
