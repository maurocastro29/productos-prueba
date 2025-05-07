const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

app.use(bodyParser.json());
require('./database');
// Servir imágenes desde /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Settings
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.use(cors());

//Routes
app.use('/api', require('./routes/productos.routes'));

//Static files
app.use(express.static(path.resolve("public")));

//Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


module.exports = app;