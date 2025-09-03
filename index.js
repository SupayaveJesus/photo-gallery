require('dotenv').config()

const express = require('express');
const session = require('express-session');
const db = require('./models');
const bodyParser = require("body-parser");
const registerController = require('./controller/auth');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Bienvenido a la galería de fotos!');
});

app.use(bodyParser.urlencoded({ extended: false }));

//configuracion de session
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});


require('./routes')(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});