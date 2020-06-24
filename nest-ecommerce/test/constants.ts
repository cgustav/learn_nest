import 'dotenv/config';
import { ConnBuilder } from '../src/db.conn-builder';

export const app: string = `http://localhost:${process.env.APP_PORT}/api`;

export const database: string = ConnBuilder.getConnectionString();
