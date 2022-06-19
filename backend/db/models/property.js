'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bedrooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    bathrooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    maxGuests: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
    Property.belongsTo(models.User, {foreignKey: 'ownerId'});
    Property.hasMany(models.Image, { foreignKey: 'propertyId', onDelete: 'cascade'});
    Property.hasMany(models.Reservation, { foreignKey: 'propertyId', onDelete: 'cascade', hooks:true});
  };
  return Property;
};