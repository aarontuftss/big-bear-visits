'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Supports', [
     {
     reservationId: 1,
     text: "hello ! I can't get the toilet to work",
     userId: 2
   },
     {
       reservationId: 2,
       text: "whats the wifi passowrd?",
       userId: 2
   },
     {
       reservationId: 3,
       text: "i got locked out !",
       userId: 3
   },
     {
       reservationId: 6,
       text: "need help asap !",
       userId: 3
   },
     {
       reservationId: 7,
       text: "we kinda broke the microwave, sorry !",
       userId: 2
   },
     {
       reservationId: 8,
       text: "where is the closest open liqour store?",
       userId: 2
   },
     {
       reservationId: 9,
       text: "is there any spare trash bags here?",
       userId: 3
   },
     {
       reservationId: 17,
       text: "why doesnt the fireplace work !",
       userId: 3
   },
    {
      reservationId: 18,
      text: "our hot tub wont get hot !",
      userId: 1
   },
     {
       reservationId: 19,
       text: "i lost the keys !",
       userId: 1
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Supports', null, {});
  }
};
