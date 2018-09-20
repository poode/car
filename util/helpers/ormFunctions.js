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
  return { modelInstance: any[0], modelExists: any[1] };
}

/**
 * this function used inside seeder only
 * @param {*} queryInterface provided from original seeder function
 * @param {*} TableName this is table name
 * @param {*} columns column is array of objects with their data to submit in database
 */
function seeder(queryInterface, TableName, columns) {
  // for (let index = 0; index < length; index += 1) {
  queryInterface.bulkInsert(TableName, columns);
  // }
}

module.exports = {
  findOrCreate,
  seeder,
};


/*
async function findOrCreate(model, options) {
  const any = await model.findOrCreate({
    where: options.where,
    defaults: options.defaults,
  });
  return { modelInstance: any[0], modelExists: any[1] };
}


function seeder(queryInterface, TableName, columns, length) {
  let cb = (i) => {!console.log(i) && i >= 0 && queryInterface.insert(TableName, [columns[i]], {}).then(() => cb(--i)).catch(err => console.error('aaaaaaa', err));}
  // for (let index = 0; index < length; index += 1) {
    cb(length - 1);
  // }
}

module.exports = {
  findOrCreate,
  seeder,
};
*/
