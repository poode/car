module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const LTRoleTypes = [
      { roleType: 'admin' },
      { roleType: 'user' },
      { roleType: 'employee' },
    ];
    const permissionTypes = [
      { permissionType: 'read' },
      { permissionType: 'write' },
      { permissionType: 'update' },
      { permissionType: 'delete' },
    ];
    const reasonTypes = [
      { reasonType: 'inquiry' },
      { reasonType: 'complaint' },
      { reasonType: 'suggestion' },
    ];
    const carTypes = [
      { carType: 'Hatchback' },
      { carType: 'Sedan' },
      { carType: 'MPV' },
      { carType: 'SUV' },
      { carType: 'Crossover' },
      { carType: 'Coupe' },
      { carType: 'Convertible' },
    ];

    queryInterface.bulkInsert('LT_roleTypes', LTRoleTypes);
    queryInterface.bulkInsert('LT_permissionTypes', permissionTypes);
    queryInterface.bulkInsert('LT_contactUsReasonTypes', reasonTypes);
    return queryInterface.bulkInsert('LT_carTypes', carTypes);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    queryInterface.bulkDelete('LT_roleTypes', null, {});
    queryInterface.bulkInsert('LT_permissionTypes', null, {});
    queryInterface.bulkInsert('LT_contactUsReasonTypes', null, {});
    return queryInterface.bulkInsert('LT_carTypes', null, {});
  },
};
