/**
 * @param {*} model sequelize model object
 * @param {*} options options should be sequelize option object for findOrCreate method
 * @returns {*} modelInstance which is created object
 * if it does not exist or found an instance of it
 * modelExists which is boolean if true then modelInstance is created
 */
async function findOrCreate(model, options) {
  if (!options.where || !options.defaults) throw Error('options should have where and defaults');
  const any = await model.findOrCreate({
    where: options.where,
    defaults: options.defaults,
  });
  const [modelInstance, modelExists] = any;
  return { modelInstance, modelExists };
}

module.exports = {
  findOrCreate,
};
