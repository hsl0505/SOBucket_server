'use strict';
module.exports = (sequelize, DataTypes) => {
  const like_user_bucket = sequelize.define(
    'like_user_bucket',
    {
      like_user: DataTypes.INTEGER,
      like_bucket: DataTypes.INTEGER,
    },
    {},
  );
  like_user_bucket.associate = function(models) {
    // associations can be defined here
    like_user_bucket.hasMany(models.users);
    like_user_bucket.hasMany(models.bucketlist);
    // like_user_bucket.belongsTo(models.users, {
    //   foreignKey: 'like_user',
    // });
    // like_user_bucket.belongsTo(models.bucketlist, {
    //   foreignKey: 'like_bucket',
    // });
  };
  return like_user_bucket;
};
