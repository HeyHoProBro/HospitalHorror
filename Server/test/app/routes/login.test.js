import _ from 'lodash';
import supertest from 'supertest';
import app from '../../../server';

const should = require('chai').should();

describe('Testing the login-function', () => {
	it('Valid login for an Administrator', done => {
		supertest(app)
		.post('/login')
		.send({username: 'admin', password: 'admin'})
		.end((err, res) => {
			should.not.exist(err);
			res.headers.location.substring(0,6).should.not.equal('/error');
			done();
		});
	});

	it('Invalid login', done => {
		supertest(app)
		.post('/login')
		.send({username: 'admin4353', password: 'admin5t6346'})
		.end((err, res) => {
			should.not.exist(err);
			res.headers.location.substring(0,6).should.equal('/error');
			done();
		});
	});
});

describe('Testing the logout-function', () => {
	it('Sending logout-request', done => {
		supertest(app)
		.post('/logout')
		.send()
		.expect(200)
		.end((err, res) => {
			should.not.exist(err);
			done();
		});
	});
});