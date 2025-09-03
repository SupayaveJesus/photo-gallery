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
        // Guardar usuario en sesión (ajusta según tu sistema de sesiones)
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
};

