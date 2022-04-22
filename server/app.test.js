const request = require('supertest');

const app = require('./app').app;
const like = require('./routes/posts/all-like').like;

it('should return Hello Test', function (done) {
  request(app).get('/api').expect('Hello Test').end(done);
});

it('should return ERROR, not found', function (done) {
    request(app).get('/api/posts/all-like/:id').expect('ERROR, not found').end(done);
});

