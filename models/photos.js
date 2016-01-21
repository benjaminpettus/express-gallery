module.exports = function(sequelize, DataTypes) {
  var Pix = sequelize.define('pix', {
    author: DataTypes.TEXT,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT 
  });
  return Pix;
};