'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    taskName:{
      type: DataTypes.STRING,
      allowNull:false
    } 
  }, {});
  Task.associate = function(models) {
   Task.belongsTo(models.User,{
     foreignKey:'UserId',
     onDelete : 'CASCADE',
    })
  };
  return Task;
};