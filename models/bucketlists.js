'use strict';
module.exports = (sequelize, DataTypes) => {
  const bucketlists = sequelize.define(
    'bucketlists',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      expectedDate: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
    },
    {},
  );
  bucketlists.associate = function(models) {
    bucketlists.hasMany(models.comments);
    bucketlists.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
  };
  return bucketlists;
};
