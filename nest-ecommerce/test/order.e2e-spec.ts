import * as request from 'supertest';
import { app, database } from './constants';
import { RegisterDTO, LoginDTO } from '../src/models/user.dto';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import axios from 'axios';
import { CreateProductDTO } from '../src/modules/product/product.dto';
import { Product } from '../src/types/product';
import { send } from 'process';

let sellerToken: string;
let buyerToken: string;

let boughtProducts: Product[];
let orderBuyer: RegisterDTO = {
  seller: false,
  username: 'testBuyer',
  password: 'testpassword',
};

let orderSeller: RegisterDTO = {
  seller: true,
  username: 'testSeller',
  password: 'testpassword',
};

const soldProducts: CreateProductDTO[] = [
  {
    title: 'newer phone',
    image: 'n/a',
    description: 'description',
    price: 10,
  },
  {
    title: 'newest phone',
    image: 'n/a',
    description: 'description',
    price: 20,
  },
];

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  ({
    data: { token: sellerToken },
  } = await axios.post(`${app}/auth/signup`, orderSeller));

  ({
    data: { token: buyerToken },
  } = await axios.post(`${app}/auth/signup`, orderBuyer));

  const [{ data: data1 }, { data: data2 }] = await Promise.all(
    soldProducts.map(product =>
      axios.post(`${app}/products`, product, {
        headers: { authorization: `Bearer ${sellerToken}` },
      }),
    ),
  );

  boughtProducts = [data1, data2];
});

beforeAll(async done => {
  await mongoose.disconnect(done);
});

describe('ORDERS', () => {
  it('Should create order of all products ', async () => {
    const orderDTO = {
      products: boughtProducts.map(product => ({
        product: product._id,
        quantity: 1,
      })),
    };

    return request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .set('Accept', 'application/json')
      .send(orderDTO)
      .expect(({ body }) => {
        expect(body.owner.username).toEqual(orderBuyer.username);
        expect(body.products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body.products[0].product._id),
        ).toBeTruthy();
        expect(body.totalPrice).toEqual(
          boughtProducts.reduce((prev, product) => prev + product.price, 0),
        );
      })
      .expect(HttpStatus.CREATED);
  });

  it('Should list all orders of buyer', () => {
    return request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body[0].products[0].product._id),
        ).toBeTruthy();
        expect(body[0].totalPrice).toEqual(
          boughtProducts.reduce((prev, product) => prev + product.price, 0),
        );
      })

      .expect(HttpStatus.OK);
  });
});
