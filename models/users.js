'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.NUMBER,
      avatar: DataTypes.STRING,
      signupDate: DataTypes.DATE,
      isBlack: DataTypes.STRING,
      blackReason: DataTypes.STRING,
      auth: DataTypes.STRING,
      like_bucket: DataTypes.INTEGER,
    },
    {},
  );
  users.associate = function(models) {
    // associations can be defined here
    // users.hasMany(models.like_user_bucket);
    // users.belongsTo(models.like_user_bucket, {
    //   foreignKey: 'like_bucket',
    // });
    users.hasMany(models.bucketlist);
    users.hasMany(models.comments);
    users.belongsTo(models.like_user_bucket, {
      foreignKey: 'like_bucket',
      targetKey: 'like_bucket',
    });
  };
  return users;
};
