const { seeder } = require('../util/helpers/ormFunctions');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const columns = [
      { roleType: 'admin' },
      { roleType: 'user' },
      { roleType: 'employee' },
    ];
    return seeder(queryInterface, 'LT_roleTypes', columns, 3);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('LT_roleTypes', null, {});
  }
};
