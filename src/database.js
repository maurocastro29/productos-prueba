const mongoose = require('mongoose');

const URI = 'mongodb+srv://mmcastro29:dRgFdhga3mefnUXS@cluster0.ovxagr1.mongodb.net/'; 

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
