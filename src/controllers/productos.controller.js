const productosDAO = require('../dao/productos.dao');
const Producto = require('../models/productos.model');

const buscarProductos = async (req, res) => {
  const { q } = req.query;
  try {
    if(q === undefined) {
      return res.status(400).json({ error: 'Error al buscar productos' });
    }
    const productos = await productosDAO.buscarPorNombre(q);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    if(req.params.id === undefined) {
      return res.status(400).json({ error: 'Error al buscar productos' });
    }
    const producto = await productosDAO.buscarPorId(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, marca, stock, categoria, createAt } = req.body;

    if (!nombre || !precio || !descripcion || !marca || !stock || !categoria || !createAt) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const productoExistente = await productosDAO.buscarPorNombre(nombre);
    if (productoExistente.length > 0){
      return res.status(400).json({ error: 'El producto ya existe' });
    }

    // Obtener paths de las imágenes
    const imagenes = Array.isArray(req.files)
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];


    // Crear el producto con imágenes incluidas
    const nuevoProducto = await productosDAO.crearProducto({
      nombre,
      precio,
      descripcion,
      marca,
      stock,
      categoria,
      createAt,
      imagenes,
      rating: 0 
    });

    res.status(201).json(nuevoProducto);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};


module.exports = {
  buscarProductos,
  obtenerProductoPorId,
  crearProducto
};
