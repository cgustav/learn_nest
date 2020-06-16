import 'dotenv/config';

export const app = `http://localhost:${process.env.APP_PORT}/api`;
export const database =
  `mongodb://${process.env.DATABASE_SERVICE_USERNAME}:${process.env.DATABASE_SERVICE_PASSWORD}` +
  `@localhost:${process.env.DB_PORT_RANGE_START}/${process.env.DATABASE_DB}`;
