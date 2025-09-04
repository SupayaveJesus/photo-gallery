const { DataTypes } = require('sequelize');

module.exports = function (sequelize){
    const Album = sequelize.define(
        'Album',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            coverId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }            
        }
    );

    return Album;
}