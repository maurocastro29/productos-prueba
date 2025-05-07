const test = require('node:test');
const assert = require('assert/strict');
const request = require('supertest');
const app = require('../index.js'); 
test('POST /api/items debe crear un nuevo producto', async (t) => {
  const nuevoProducto = {
    nombre: 'Camiseta',
    precio: 29.99,
    descripcion: 'Camiseta de algodón',
    marca: 'Otsu',
    stock: 150,
    categoria: 'Ropa',
    createAt: '06/05/2025',
    imagenes: ['/uploads/1746591161388-Captura de pantalla 2025-04-29 083855.png', '/uploads/1746587282114-Captura de pantalla 2025-05-04 122212.png'],
  };
  
  const res = await request(app)
    .post('/api/create')
    .send(nuevoProducto)
    .set('Accept', 'application/json');

  assert.equal(res.statusCode, 201); // o 200 si tu endpoint responde así
  assert.equal(res.body.nombre, nuevoProducto.nombre);
  assert.ok(res.body._id); // asegura que se creó en la base de datos
});

test('GET /api/items debe devolver una lista de productos', async (t) => {
  const res = await request(app)
    .get('/api/items?q=Product')
    .set('Accept', 'application/json');

  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body)); // asegura que la respuesta es un array
  assert.ok(res.body.length > 0); // asegura que hay al menos un producto
});

test('GET /api/items debe devolver un productos', async (t) => {
    const res = await request(app)
      .get('/api/items/681ace92707dc6aea36e9128')
      .set('Accept', 'application/json');
  
    assert.equal(res.statusCode, 200);
    assert.ok(res.body); // asegura que la respuesta es un objeto
    assert.ok(res.body._id == '681ace92707dc6aea36e9128'); // asegura que hay un producto
});
