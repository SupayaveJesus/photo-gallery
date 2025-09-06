const db = require('../models');

exports.getAlbums = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const albums = await db.Album.findAll({
            where: { userId: req.session.user.id }
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

exports.getCreateAlbum = (req, res) => {
    res.render('albums/create');
};

exports.postCreateAlbum = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === '') {
            return res.render('albums/create', {
                error: 'El título del álbum es obligatorio'
            });
        }
        await db.Album.create({
            title: title.trim(),
            userId: req.session.user.id
        });
    res.redirect('/albums');
    } catch (error) {
        console.error(error);
    res.render('albums/create', {
            error: 'Error al crear el álbum'
        });
    }
}


