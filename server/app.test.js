const request = require('supertest');

const app = require('./app').app;
const post = {
  title: 'grgersgre',
  content: 'fgfs geger ghe',
};
const user = {
  firstName: 'grgersgre',
  lastName: 'fgfs geger ghe',
  email: 'test@tast.com',
  passworst: 'testtest'
};


it('should return Hello Test', function (done) {
  request(app).get('/api').expect('Hello Test').end(done);
});

it('should return ERROR, not found', function (done) {
    request(app).get('/api/posts/all-like/:id').expect('ERROR, not found').end(done);
});

it('should return status 400 Bad Request', function (done) {
  request(app).post('/api/posts/add-post', post).expect(400).end(done);
});

it('should return status 200 for create user', function (done) {
  request(app).post('/api/auth/sign-up', user).expect(400).end(done);
});

it('should return fail!!!', function (done) {
  request(app).get('/api/auth/fail').expect('fail!!!').end(done);
});
