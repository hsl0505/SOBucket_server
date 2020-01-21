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
    comments.belongsTo(models.users, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
    comments.belongsTo(models.bucketlists, {
      foreignKey: 'bucket_id',
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
  };
  return comments;
};
