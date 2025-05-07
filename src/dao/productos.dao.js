const Producto = require('../models/productos.model');

const buscarPorNombre = async (nombre) => {
  return await Producto.find({ nombre: { $regex: nombre, $options: 'i' } });
};

const buscarPorId = async (id) => {
  return await Producto.findById(id);
};

const crearProducto = async (data) => {
  const producto = new Producto(data);
  return await producto.save();
};

module.exports = {
  buscarPorNombre,
  buscarPorId,
  crearProducto
};
