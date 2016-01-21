module.exports = function(sequelize, DataTypes) {
  var Pix = sequelize.define('Pix', {
    author: DataTypes.TEXT,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT 
  });
  return Pix;
};