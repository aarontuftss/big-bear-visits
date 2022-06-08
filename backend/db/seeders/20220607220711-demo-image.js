'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
      {
      propertyId: 1,
       link: "https://www.destinationbigbear.com/media/images/LakeviewEscape/2000/00100.jpg"
    },
     {
       propertyId: 1,
       link: "https://www.destinationbigbear.com/media/images/LakeviewEscape/500/00110.jpg"
     },
     {
       propertyId: 2,
       link: "https://www.destinationbigbear.com/media/images/BeartreeHideaway/2000/00100.jpg"
     },
     {
       propertyId: 2,
       link: "https://www.destinationbigbear.com/media/images/BeartreeHideaway/500/00110.jpg"
     },
     {
       propertyId: 3,
       link: "https://www.destinationbigbear.com/media/images/HibernationStation/2000/00100.jpg"
     },
     {
       propertyId: 3,
       link: "https://www.destinationbigbear.com/media/images/HibernationStation/500/00105.jpg"
     },
     {
       propertyId: 4,
       link: "https://www.destinationbigbear.com/media/images/TimeWellSpent/2000/00100.jpg"
     },
     {
       propertyId: 4,
       link: "https://www.destinationbigbear.com/media/images/TimeWellSpent/500/00110.jpg"
     },
     {
       propertyId: 5,
       link: "https://www.destinationbigbear.com/media/images/SteppingBackinTime/2000/00100.jpg"
     },
     {
       propertyId: 5,
       link: "https://www.destinationbigbear.com/media/images/SteppingBackinTime/500/00110.jpg"
     },
     {
       propertyId: 6,
       link: "https://www.destinationbigbear.com/media/images/SugarBear/2000/00100.jpg"
     },
     {
       propertyId: 6,
       link: "https://www.destinationbigbear.com/media/images/SugarBear/500/00110.jpg"
     },
     {
       propertyId: 7,
       link: "https://www.destinationbigbear.com/media/images/WinterHaus/2000/00100.jpg"
     },
     {
       propertyId: 7,
       link: "https://www.destinationbigbear.com/media/images/WinterHaus/500/00110.jpg"
     },
     {
       propertyId: 8,
       link: "https://www.destinationbigbear.com/media/images/MooseMountain/2000/00100.jpg"
     },
     {
       propertyId: 8,
       link: "https://www.destinationbigbear.com/media/images/MooseMountain/500/00130.jpg"
     },
     {
       propertyId: 9,
       link: "https://www.destinationbigbear.com/media/images/HighTimberFamilyRetreat/2000/00100.jpg"
     },
     {
       propertyId: 9,
       link: "https://www.destinationbigbear.com/media/images/HighTimberFamilyRetreat/500/00110.jpg"
     },
     {
       propertyId: 10,
       link: "https://www.destinationbigbear.com/media/images/FairytalePlace/2000/00100.jpg"
     },
     {
       propertyId: 10,
       link: "https://www.destinationbigbear.com/media/images/FairytalePlace/500/00110.jpg"
     },
     
     
     
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
