'use strict';

module.exports = (sequelize, DataTypes) => {
  const bucketlist = sequelize.define(
    'bucketlist',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      expectedDate: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      like_user: DataTypes.INTEGER,
    },
    {},
  );
  bucketlist.associate = function(models) {
    // associations can be defined here
    // bucketlist.hasMany(models.like_user_bucket);
    // bucketlist.hasMany(models.users);
    // bucketlist.belongsTo(models.like_user_bucket, {
    //   foreignKey: 'like_user',
    // });
    bucketlist.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    bucketlist.belongsTo(models.like_user_bucket, {
      foreignKey: 'like_user',
      targetKey: 'like_user',
    });
  };
  return bucketlist;
};
