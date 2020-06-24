import 'dotenv/config';

interface AtlasConnectionString {
  username: string;
  password: string;
  db: string;
  dns: string;
}

interface ConnectionString {
  username: string;
  password: string;
  port: string;
  db: string;
}

export abstract class ConnBuilder {
  static getConnectionString(): string {
    if (process.env.NODE_ENV === 'test') return this.getTestDB();
    else if (process.env.NODE_ENV === 'dev') return this.getDevelopmentDB();
    else return this.getProductionDB();
  }

  protected static getProductionDB(): string {
    return this.createC({
      username: process.env.DATABASE_SERVICE_USERNAME,
      password: process.env.DATABASE_SERVICE_PASSWORD,
      dns: process.env.DATABASE_SERVICE_DNS,
      db: process.env.DATABASE_DB,
    });
  }

  protected static getDevelopmentDB(): string {
    return this.create({
      username: process.env.DATABASE_SERVICE_USERNAME,
      password: process.env.DATABASE_SERVICE_PASSWORD,
      port: process.env.DB_PORT_RANGE_START,
      db: process.env.DATABASE_DB,
    });
  }

  protected static getTestDB(): string {
    return this.create({
      username: process.env.DATABASE_TEST_USERNAME,
      password: process.env.DATABASE_TEST_PASSWORD,
      port: process.env.DB_PORT_RANGE_START,
      db: process.env.DATABASE_TEST_DB,
    });
  }

  private static create({
    username,
    password,
    port,
    db,
  }: ConnectionString): string {
    return `mongodb://${username}:${password}@localhost:${port}/${db}`;
  }

  private static createC({
    username,
    password,
    dns,
    db,
  }: AtlasConnectionString): string {
    return `mongodb+srv://${username}:${password}@${dns}.mongodb.net/${db}?retryWrites=true&w=majority`;
  }
}
