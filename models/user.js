const { DataTypes } = require('sequelize');

module.exports = function (sequelize){
    const User = sequelize.define(
        'User', 
        {
            nombre_completo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
            email: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: true
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
    );

    return User;
}