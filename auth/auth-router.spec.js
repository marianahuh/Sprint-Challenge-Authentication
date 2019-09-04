const request = require('supertest');

const db = require('../database/dbConfig.js');

const server = require('../api/server.js');

const auth = require('./auth-router.js');

describe('auth testing', () => {
  describe('POST /register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return 201', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'Liz',
          password: '123'
        });
      expect(res.status).toBe(201);
    });
  });
});
