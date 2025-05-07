const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productosController = require('../controllers/productos.controller');

// Configuración de multer
const storage = multer.diskStorage({
destination: './uploads/',
filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
}
});
const upload = multer({ storage });

router.get('/items', productosController.buscarProductos);
router.get('/items/:id', productosController.obtenerProductoPorId);
router.post('/create', upload.array('imagenes', 10), productosController.crearProducto);


module.exports = router;