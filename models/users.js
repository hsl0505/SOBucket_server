'use strict';

require('dotenv').config();

const crypto = require('crypto');

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
      underscored: false,
      hooks: {
        beforeCreate: (data, option) => {
          console.log('beforeCreate activated!');
          const shasum = crypto.createHmac('sha512', process.env.CRYPTO_SECRET);
          shasum.update(data.password);
          data.password = shasum.digest('hex');
        },
        beforeFind: (data, option) => {
          console.log('beforeFind activated!');
          if (data.where.password) {
            const shasum = crypto.createHmac(
              'sha512',
              process.env.CRYPTO_SECRET,
            );
            shasum.update(data.where.password);
            data.where.password = shasum.digest('hex');
          }
        },
        beforeUpdate: (data, option) => {
          console.log('beforeUpdate activated!');
          console.log('before update data : ', data);
          if (data.dataValues.password) {
            console.log('data dataValues activated!!!');
            const shasum = crypto.createHmac(
              'sha512',
              process.env.CRYPTO_SECRET,
            );
            shasum.update(data.dataValues.password);
            data.dataValues.password = shasum.digest('hex');
          }
        },
      },
    },
  );
  users.associate = function(models) {
    users.hasMany(models.comments);
    users.hasMany(models.likes);
    users.hasMany(models.bucketlists, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
  };
  return users;
};
