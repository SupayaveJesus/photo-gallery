const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const AlbumPhoto = sequelize.define(
        'AlbumPhoto',
        {
            albumId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            photoId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );

    return AlbumPhoto;
}
