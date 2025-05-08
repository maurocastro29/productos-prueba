
const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  marca: String,
  stock: Number,
  categoria: String,
  createAt: String,
  imagenes: [String],
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = model('productos', ProductoSchema);
