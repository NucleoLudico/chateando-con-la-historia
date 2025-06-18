const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('API de usuarios', () => {
  it('registra y loguea usuario', async () => {
    const user = { username: 'test', email: 'test@test.com', password: 'pass123' };
    const res = await request(app).post('/api/users/register').send(user);
    expect(res.statusCode).toBe(201);

    const login = await request(app).post('/api/users/login').send({ email: user.email, password: user.password });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
