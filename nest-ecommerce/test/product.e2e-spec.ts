import * as request from 'supertest';
import { app, database } from './constants';
import { RegisterDTO, LoginDTO } from '../src/models/user.dto';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import axios from 'axios';
import { CreateProductDTO } from '../src/modules/product/product.dto';

let sellerToken: string;
let productSeller: RegisterDTO = {
  seller: true,
  username: 'testseller',
  password: 'testpassword',
};

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  const {
    data: { token },
  } = await axios.post(`${app}/auth/signup`, productSeller);

  sellerToken = token;
});

beforeAll(async done => {
  await mongoose.disconnect(done);
});

describe('PRODUCTS', () => {
  let productId: string;
  const product: CreateProductDTO = {
    title: 'new phone',
    image: 'n/a',
    description: 'some description',
    price: 10000,
  };

  it('Should list all existing products', () => {
    return request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  it('Should list all my products', () => {
    return request(app)
      .get('/products/mine')
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  it('Should create a new product', () => {
    return request(app)
      .post('/products')
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .send(product)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        productId = body._id;
        expect(body.title).toEqual(product.title);
        expect(body.image).toEqual(product.image);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(HttpStatus.CREATED);
  });

  it('Should read the created product', () => {
    return request(app)
      .get(`/products/${productId}`)
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(HttpStatus.OK);
  });

  it('Should update existing product', () => {
    return request(app)
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .send({ title: 'newTitle' })
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.title).toEqual('newTitle');
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(HttpStatus.OK);
  });

  it('Should delete existing product', () => {
    return request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.title).toEqual('newTitle');
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner).toBeDefined();
      })
      .expect(HttpStatus.OK);
  });

  it('Should display non existing result', async () => {
    return request(app)
      .get(`/products/${productId}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
