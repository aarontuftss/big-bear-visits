'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    propertyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Properties' },
    },
    renterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE},
    endDate: {
      allowNull: false,
      type: DataTypes.DATE}
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.hasMany(models.Support, {foreignKey: 'reservationId'});
    Reservation.belongsTo(models.Property, {foreignKey: 'properyId'});
    Reservation.belongsTo(models.User, {foreignKey: 'renterId'});
  };
  return Reservation;
};