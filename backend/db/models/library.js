'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Library.belongsTo(models.User, {foreignKey: "userId"})
      Library.belongsTo(models.Song, {foreignKey: "ownedSongId"})
      Library.belongsTo(models.Album, {foreignKey: "ownedAlbumId"})
    }
  }
  Library.init({
    userId: DataTypes.INTEGER,
    ownedSongId: DataTypes.INTEGER,
    ownedAlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Library',
  });
  return Library;
};
