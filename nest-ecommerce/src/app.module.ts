import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnBuilder } from './db.conn-builder';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

const conString: string = ConnBuilder.getConnectionString();
console.log('Connection String: ', conString);

@Module({
  imports: [
    MongooseModule.forRoot(conString),
    SharedModule,
    AuthModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
