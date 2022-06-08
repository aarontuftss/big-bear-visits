'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reservations', [
     {
     propertyId: 1,
     renterId: 2,
     startDate: "2022-05-09",
     endDate: "2022-05-15",
   },
     {
       propertyId: 1,
       renterId: 2,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 1,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 2,
       renterId: 2,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 2,
       renterId: 2,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 2,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 3,
       renterId: 2,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 3,
       renterId: 2,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 3,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 4,
       renterId: 2,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 4,
       renterId: 2,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 4,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 5,
       renterId: 2,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 5,
       renterId: 2,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 5,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 6,
       renterId: 3,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 6,
       renterId: 3,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 6,
       renterId: 1,
       startDate: "2022-05-01",
       endDate: "2022-05-03",
     },
     {
       propertyId: 7,
       renterId: 1,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 7,
       renterId: 1,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 7,
       renterId: 1,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },
     {
       propertyId: 8,
       renterId: 3,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 8,
       renterId: 3,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 8,
       renterId: 1,
       startDate: "2022-04-25",
       endDate: "2022-04-28",
     },
     {
       propertyId: 9,
       renterId: 3,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 9,
       renterId: 3,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 9,
       renterId: 1,
       startDate: "2022-04-15",
       endDate: "2022-04-18",
     },
     {
       propertyId: 10,
       renterId: 3,
       startDate: "2022-05-09",
       endDate: "2022-05-15",
     },
     {
       propertyId: 10,
       renterId: 3,
       startDate: "2022-05-16",
       endDate: "2022-05-19",
     },
     {
       propertyId: 10,
       renterId: 3,
       startDate: "2022-05-25",
       endDate: "2022-05-28",
     },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reservations', null, {});
  }
};
