import 'dotenv/config';
import * as request from 'supertest';
import { app } from './constants';
import { RegisterDTO, LoginDTO } from '../src/models/user.dto';
import { HttpStatus, RequestTimeoutException } from '@nestjs/common';

describe('AUTH', () => {
  const seller: RegisterDTO = {
    username: 'sellerx',
    password: 'passwordx',
    seller: true,
  };

  const sellerLogin: LoginDTO = {
    username: 'sellerx',
    password: 'passwordx',
  };

  const user: RegisterDTO = {
    username: 'usernamex',
    password: 'passwordx',
    seller: false,
  };

  const userLogin: LoginDTO = {
    username: 'usernamex',
    password: 'passwordx',
  };

  let userToken: string;
  let sellerToken: string;

  it('should register new seller', () => {
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(seller)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual(seller.username);
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should register new user', () => {
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual(user.username);
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(seller)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login seller', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(sellerLogin)
      .expect(({ body }) => {
        sellerToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual(seller.username);
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeTruthy();
      })
      .expect(HttpStatus.OK);
  });

  it('should login user', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(userLogin)
      .expect(({ body }) => {
        userToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual(user.username);
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.OK);
  });
});
