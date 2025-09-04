const db = require('../models');

exports.getHome = async (req, res) => {
	try {
		const photos = await db.Photo.findAll({
			where: { userId: req.session.user.id }
		});
		res.render('home/index', {
			userName: req.local.userName,
			userEmail: req.local.userEmail,
			photos
		});
	} catch (error) {
		console.error('Error al cargar las fotos:', error);
		res.render('home/index', {
			userName: req.local.userName,
			userEmail: req.local.userEmail,
			photos: []
		});
	}
};
