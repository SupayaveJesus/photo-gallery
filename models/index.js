const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Photo = require('./photos')(sequelize);
const Album = require('./album')(sequelize);

// Asociaciones Sequelize (relaciones)
// Un usuario tiene muchas fotos
User.hasMany(Photo, { foreignKey: 'userId' });
// Una foto pertenece a un usuario
Photo.belongsTo(User, { foreignKey: 'userId' });

// Ejemplo de uso en un controlador:
//
// // Obtener todas las fotos de un usuario:
// const user = await db.User.findByPk(req.session.user.id, { include: db.Photo });
// const photos = user.Photos;
//
// // Obtener el usuario de una foto:
// const photo = await db.Photo.findByPk(photoId, { include: db.User });
// const user = photo.User;

module.exports = {
  sequelize,
  User,
  Photo,
  Album

};