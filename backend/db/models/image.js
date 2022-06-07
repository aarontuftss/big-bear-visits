'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    propertyId: {
      type: DataTypes.INTEGER,
      references: {model: 'Properties'},
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Property, {foreignKey: 'propertyId'})
  };
  return Image;
};