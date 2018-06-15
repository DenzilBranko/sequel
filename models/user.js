'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
   User.hasMany(models.Task,{
      foreignKey: 'UserId',
    })
  };
  return User;
};