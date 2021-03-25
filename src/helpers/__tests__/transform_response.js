const { transformObjectToResponse } = require('../transform_response');

const request = require('supertest');
const { app } = require('../../index');
const { logger } = require('../logger');

describe('GET /api/v1/colores', () => {
  it('Valor predeterminado de page es 1', async () => {
    const response = await request(app).get('/api/v1/colores');
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
  });
  it('Valor predeterminado de rowsPerPage es 6', async () => {
    const response = await request(app).get('/api/v1/colores');
    expect(response.status).toBe(200);
    expect(response.body.rowsPerPage).toBe(6);
  });
  it('Respuesta con valor predeterminado', async () => {
    const response = await request(app).get('/api/v1/colores');
    expect(response.status).toBe(200);
    expect(response.body.rowsPerPage).toBe(6);
    expect(response.body.page).toBe(1);
    expect(response.body.colors.length).toBe(6);
  });
  it('Parametro page con valor abc', async () => {
    const response = await request(app).get('/api/v1/colores?page=abc');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Parametros incorrectos' });
  });
  it('Parametro rowsPerPage con valor abc', async () => {
    const response = await request(app).get('/api/v1/colores?rowsPerPage=abc');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Parametros incorrectos' });
  });
  it('Parametro page y rowsPerPage con valores 2 y 4 respectivamente', async () => {
    const response = await request(app).get('/api/v1/colores?page=2&rowsPerPage=4');
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(2);
    expect(response.body.rowsPerPage).toBe(4);
    expect(response.body.colors.length).toBe(4);
  });
})