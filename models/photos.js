const { DataTypes } = require('sequelize');
const user = require('./user');

module.exports = function (sequelize) {
    const Photo = sequelize.define(
        'Photo',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fileName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );

    return Photo;
}