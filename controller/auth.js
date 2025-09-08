const db = require('../models')
const sha1 = require('sha1');

exports.getRegister = (req, res) => {
    res.render("auth/register", { error: null });
};

exports.postRegister = async (req, res) => {
    const { nombre_completo, email, password } = req.body;
    try {
        const userWithEmail = await db.User.findOne({ where: { email } });
        if (userWithEmail) {
            res.render('auth/register', { error: 'El email ya está en uso' });
            return;
        }
        await db.User.create({
            nombre_completo,
            email,
            password_hash: sha1(password)
        });
    res.redirect("/login");
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error al registrar usuario");
    }


};

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user || user.password_hash !== sha1(password)) {
            res.render('auth/login', { error: 'Email o contraseña incorrectos' });
            return;
        }
        req.session.user = {
            id: user.id,
            name: user.nombre_completo,
            email: user.email
        };
        res.redirect('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión');
            return;
        }
        res.redirect('/login');
    });
};

exports.getUserPhotos = async (userId) => {
    return await db.Photo.findAll({
        where: { userId }
    });
}