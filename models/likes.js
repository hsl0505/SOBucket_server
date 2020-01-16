'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define(
    'likes',
    {
      user_id: DataTypes.INTEGER,
      bucket_id: DataTypes.INTEGER,
    },
    {},
  );
  likes.associate = function(models) {
    likes.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    likes.belongsTo(models.bucketlists, {
      foreignKey: 'bucket_id',
    });
  };
  return likes;
};
