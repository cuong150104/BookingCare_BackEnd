'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'example@example.com',
        password: '12345',
        firstName: 'John',
        lastName: 'Doe',
        address: 'da nang',
        phoneNumber: '2323232323' ,
        gender: 'male',
        roleId: 'ROLE',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
