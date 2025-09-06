const path = require('path');
const db = require('../models');
const fs = require('fs');


exports.getUploadPhoto = (req, res) => {
    res.render('photos/upload', { error: null, userName: req.local.userName, userEmail: req.local.userEmail });
};

exports.postUploadPhoto = async (req, res) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).send('No se subió ninguna foto');
        }

        const photoFile = req.files.photo;
        // Solo el nombre del usuario como nombre de archivo
        // Limpiar el nombre para evitar caracteres problemáticos
        const userName = req.session.user.name.replace(/[^a-zA-Z0-9_-]/g, '');
        const extension = path.extname(photoFile.name);
        const fileName = userName + extension;
        const uploadPath = path.join(__dirname, '../public/uploads/', fileName);

        await photoFile.mv(uploadPath);

        await db.Photo.create({
            title: req.body.title,
            fileName: fileName,
            url: '/uploads/' + fileName,
            userId: req.session.user.id
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error al subir la foto:', error);
        res.status(500).send('Error al subir la foto');
    }
};

