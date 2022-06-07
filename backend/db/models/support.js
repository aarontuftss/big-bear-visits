'use strict';
module.exports = (sequelize, DataTypes) => {
  const Support = sequelize.define('Support', {
    reservationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Reservations' },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Support.associate = function(models) {
    // associations can be defined here
    Support.belongsTo(models.Reservation, {foreignKey: 'reservationId'});
    Support.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Support;
};