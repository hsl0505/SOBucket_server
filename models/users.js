'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      userName: DataTypes.STRING,
      userNickName: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      signupDate: DataTypes.DATE,
      isBlack: DataTypes.STRING,
      blackReason: DataTypes.STRING,
      auth: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, option) => {
          const shasum = crypto.createHmac('sha512', 'SOBucketSecret');
          shasum.update(data.password);
          data.password = shasum.digest('hex');
        },
        beforeFind: (data, option) => {
          if (data.where.password) {
            const shasum = crypto.createHmac('sha512', 'SOBucketSecret');
            shasum.update(data.where.password);
            data.where.password = shasum.digest('hex');
          }
        },
      },
    },
  );
  users.associate = function(models) {
    users.hasMany(models.comments);
    users.hasMany(models.likes);
    users.hasMany(models.bucketlists);
  };
  return users;
};
