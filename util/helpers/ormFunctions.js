/**
 * @param {*} model object
 * @param {*} options options should be sequelize option object for findOrCreate method
 * @returns {*} modelInstance which is created object
 * if it does not exist or found an instance of it
 * modelExists which is boolean if true then modelInstance is created
 */
async function findOrCreate(model, options) {
  const any = await model.findOrCreate({
    where: options.where,
    defaults: options.defaults,
  });
  // @TODO array Destruction instead of any[]
  return { modelInstance: any[0], modelExists: any[1] };
}

module.exports = {
  findOrCreate,
};
