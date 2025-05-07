const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/productos-crud'; 

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
