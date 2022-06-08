'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Properties', [
     {
     ownerId: 1,
     price: 392,
     name: "Stephanie's Cabin",
     address: "41739 Swan Drive",
     city: 'Big Bear Lake',
     state: 'California',
     bedrooms: 2,
     bathrooms: 1,
     maxGuests: 3,
     description: "Nestled in the popular lower Moonridge community between Snow Summit and Bear Mountain Resort is the adorable Stephanie’s Cabin",
   },
     {
       ownerId: 1,
       price: 514,
       name: "The Bunk House",
       address: "640 Conklin Road",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 2,
       bathrooms: 1,
       maxGuests: 3,
       description: "The Bunk House has it all for a great vacation in Big Bear Lake with sweeping views of the slopes, a hot tub for the ultimate in relaxation and beautiful finishes with a cozy mountain flair."
      },
     {
       ownerId: 1,
       price: 325,
       name: "Spruce Hallow",
       address: "40345 York Lane",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 2,
       bathrooms: 2,
       maxGuests: 4,
       description: "Spruce Hollow is a charming and quaint two level, A-frame style Big Bear cabin with two bedrooms and one and a half baths.",
      },
     {
       ownerId: 1,
       price: 380,
       name: "Fairytale Place",
       address: "43636 Sheephorn Road",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 3,
       bathrooms: 2,
       maxGuests: 5,
       description: "You’ll truly be stepping into a fairytale when you stay at Fairytale Place. As you pull up the driveway you’ll notice how tucked away this home is.",

     },
     {
       ownerId: 1,
       price: 475,
       name: "Owl's Perch",
       address: "42558 Cedar Avenue",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 3,
       bathrooms: 1,
       maxGuests: 4,
       description: "Owl’s Perch is a cozy three bedroom home with a charming cabin feel.",
      },




     {
       ownerId: 2,
       price: 843,
       name: "Hidden Pines",
       address: "842 Edgemoor Road",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 4,
       bathrooms: 2,
       maxGuests: 6,
       description: "Just a few minutes drive will take you from your mountain retreat at Hidden Pines to Bear Mountain Resort, the Zoo, golfing and anything else you'd like to do on your vacation to Big Bear Lake."
     },
     {
       ownerId: 2,
       price: 463,
       name: "Mountain Hideaway",
       address: "166 N Teakwood Drive",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 2,
       bathrooms: 2,
       maxGuests: 6,
       description: "Welcome to our Mountain Hideaway, the ultimate cabin getaway in scenic Big Bear.Located close to Big Bear Lake, Snow Summit & Bear Mountain Resort, as well as the village",
      },
     {
       ownerId: 2,
       price: 771,
       name: "Lake Point Crossing",
       address: "967 Club View",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 3,
       bathrooms: 3,
       maxGuests: 10,
       description: "Located between Gilner Point, Lagonita Point, Gibralter Point, Metcalf Bay and just a few minutes drive to the marina, The Village and hiking trails, Lake Point Crossing is a great Big Bear Cabin for your next family getaway!"
     },
     {
       ownerId: 3,
       price: 787,
       name: "Lakeview Escape",
       address: "42824 Eagles Flight Place",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 3,
       bathrooms: 3,
       maxGuests: 8,
       description: "Fantastic log Big Bear Cabin,  just perfect for your Big Bear Lake getaway, any time of year! Relax in the hot tub, play a game of pool or just lounge on the sofa and watch the 82 inch Samsung QLED 4K smart tv with sound system."
     },
     {
       ownerId: 3,
       price: 703,
       name: "4 Seasons Cabin",
       address: "42470 Golden Oak Road",
       city: 'Big Bear Lake',
       state: 'California',
       bedrooms: 2,
       bathrooms: 2,
       maxGuests: 5,
       description: "Winter, spring, summer or fall...any time of year is the perfect time to spend your vacation in Big Bear Lake at 4 Seasons Cabin!  This charming Big Bear cabin boasts original rustic elements with comfortable upgrades for a fabulous stay."
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Properties', null, {});
  }
};
