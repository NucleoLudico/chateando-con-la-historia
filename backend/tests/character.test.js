const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Endpoints de personajes', () => {
  let token;
  beforeAll(async () => {
    await request(app).post('/api/users/register').send({ username: 'c', email: 'c@test.com', password: '1234', role: 'curador' });
    const login = await request(app).post('/api/users/login').send({ email: 'c@test.com', password: '1234' });
    token = login.body.token;
  });

  it('duplica personaje', async () => {
    const res = await request(app)
      .post('/api/characters')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Orig')
      .field('promptAlma', 'alma')
      .field('biography', 'bio');
    expect(res.statusCode).toBe(201);
    const id = res.body.character.id;
    const dup = await request(app)
      .post(`/api/characters/${id}/duplicate`)
      .set('Authorization', `Bearer ${token}`);
    expect(dup.statusCode).toBe(201);
    expect(dup.body.name).toMatch(/Copia/);
  });
});
