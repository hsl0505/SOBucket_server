'use strict';
module.exports = (sequelize, DataTypes) => {
  const bucketlists = sequelize.define(
    'bucketlists',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.STRING,
      likeCount: DataTypes.INTEGER,
      expectedDate: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
    },
    { underscored: false },
  );
  bucketlists.associate = function(models) {
    bucketlists.hasMany(models.comments, {
      foreignKey: 'bucket_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
    bucketlists.hasMany(models.likes, {
      foreignKey: 'bucket_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
    bucketlists.belongsTo(models.users, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
  };
  return bucketlists;
};
