import 'dotenv/config';

interface ConnectionString {
  username: string;
  password: string;
  port: string;
  db: string;
}

export abstract class ConnBuilder {
  static getProductionDB(): string {
    return this.create({
      username: process.env.DATABASE_SERVICE_USERNAME,
      password: process.env.DATABASE_SERVICE_PASSWORD,
      db: process.env.DATABASE_DB,
      port: process.env.DB_PORT_RANGE_START,
    });
  }
  static getTestDB(): string {
    return this.create({
      username: process.env.DATABASE_TEST_USERNAME,
      password: process.env.DATABASE_TEST_PASSWORD,
      db: process.env.DATABASE_TEST_DB,
      port: process.env.DB_PORT_RANGE_START,
    });
  }
  static create({ username, password, port, db }: ConnectionString): string {
    return `mongodb://${username}:${password}@localhost:${port}/${db}`;
  }
}
