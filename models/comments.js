'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    'comments',
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      bucket_id: DataTypes.INTEGER,
    },
    {},
  );
  comments.associate = function(models) {
    // associations can be defined here
    // comments.hasMany(models.users);
    // comments.hasMany(models.bucketlist);
    comments.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    comments.belongsTo(models.bucketlist, {
      foreignKey: 'bucket_id',
    });
  };
  return comments;
};
