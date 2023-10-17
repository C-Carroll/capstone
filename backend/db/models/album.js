'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Library, {foreignKey: "ownedAlbumId"})
      Album.hasMany(models.Review, {foreignKey: "albumId"})
      Album.hasMany(models.Song, {foreignKey: "albumId"})
      Album.belongsTo(models.Artist, {foreignKey: "artistId"})
    }
  }
  Album.init({
    artistId: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    albumPicture: DataTypes.STRING,
    albumPrice: DataTypes.INTEGER,
    albumRating: DataTypes.DECIMAL,
    isExplicit: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
