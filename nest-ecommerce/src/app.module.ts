import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnBuilder } from './db.conn-builder';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

const connString: string =
  process.env.NODE_ENV === 'test'
    ? ConnBuilder.getTestDB()
    : ConnBuilder.getProductionDB();

console.log('Connection String: ', connString);

@Module({
  imports: [MongooseModule.forRoot(connString), SharedModule, AuthModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
