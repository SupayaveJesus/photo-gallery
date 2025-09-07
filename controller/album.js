const db = require('../models');


exports.getAlbums = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const albums = await db.Album.findAll({
            where: { userId: req.session.user.id },
            include: [{ model: db.Photo, as: 'coverPhoto' }]
        });
        console.log('Álbumes recuperados:', albums);
        res.render('albums/index', {
            albums,
            userEmail: req.session.user.email,
            userName: req.session.user.name
        });
    } catch (error) {
        console.error('Error al cargar los álbumes:', error);
        res.render('albums/index', {
            albums: [],
            userEmail: req.session.user.email,
            userName: req.session.user.name
        });
    }
};

exports.getCreateAlbum = async (req, res) => {
    try {
        const photos = await db.Photo.findAll({
            where: { userId: req.session.user.id }
        });
        res.render('albums/create', {
            photos,
            userEmail: req.session.user.email,
            userName: req.session.user.name,

        });
    } catch (error) {
        console.error('Error al cargar las fotos para portada:', error);
        res.render('albums/create', {
            photos: [],
            userEmail: req.session.user.email,
            userName: req.session.user.name,
            error: 'No se pudieron cargar las fotos'
        });
    }
};

exports.postCreateAlbum = async (req, res) => {
    try {
        const { title, coverPhoto } = req.body;
        if (!title || title.trim() === '') {
            return res.render('albums/create', {
                error: 'El título del álbum es obligatorio'
            });
        }
        await db.Album.create({
            title: title.trim(),
            userId: req.session.user.id,
            coverId: coverPhoto && coverPhoto !== '' ? coverPhoto : null
        });
        res.redirect('/albums');
    } catch (error) {
        console.error(error);
        res.render('albums/create', {
            error: 'Error al crear el álbum'
        });
    }
}

exports.getAlbumDetails = async (req, res) => {
    const authController = require('./auth');
    const userPhotos = await authController.getUserPhotos(req.session.user.id);
    try {
        const albumId = req.params.id;
        const album = await db.Album.findByPk(albumId, {
            include: [
                { model: db.Photo, as: 'photos' },
                { model: db.Photo, as: 'coverPhoto' }
            ]
        });

        if (!album) {
            return res.redirect('/albums');
        }

        // Asegura que album.photos sea siempre un array válido
        const albumPhotos = Array.isArray(album.photos)
            ? album.photos.filter(p => p && typeof p === 'object' && typeof p.id !== 'undefined' && typeof p.title !== 'undefined')
            : [];
        // Asegura que coverPhoto sea null si no existe
        album.coverPhoto = album.coverPhoto && album.coverPhoto.id ? album.coverPhoto : null;

        res.render('albums/detail', {
            album,
            photos: albumPhotos,
            userPhotos,
            userEmail: req.session.user.email,
            userName: req.session.user.name
        });
    } catch (error) {
        console.error('Error al cargar los detalles del álbum:', error);
        res.status(500).send('Error al cargar los detalles del álbum');
    }
}
