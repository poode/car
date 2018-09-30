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

    queryInterface.bulkInsert('LTRoleTypes', LTRoleTypes);
    queryInterface.bulkInsert('LTPermissionTypes', permissionTypes);
    queryInterface.bulkInsert('LTContactUsReasonTypes', reasonTypes);
    return queryInterface.bulkInsert('LTCarTypes', carTypes);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    queryInterface.bulkDelete('LTRoleTypes', null, {});
    queryInterface.bulkInsert('LTPermissionTypes', null, {});
    queryInterface.bulkInsert('LTContactUsReasonTypes', null, {});
    return queryInterface.bulkInsert('LTCarTypes', null, {});
  },
};
