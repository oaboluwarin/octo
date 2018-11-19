import supertest from 'supertest';
import app from '../server/app';

const request = supertest(app);

describe('API', () => {
  describe('The home route', () => {
    it('Returns an appropriate welcome message', (done) => {
      request.get('/')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.message).toBe('Welcome to OctoJot');
          done();
        });
    });
  });

  describe('/users', () => {
    it('fetches all the users on the /users/all route', (done) => {
      request.get('/users/all')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.length).toBe(3);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0].name).toBe('Oreoluwade');
          done();
        });
    });
  });
});
