import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnBuilder } from './db.connection';

const connString: string =
  process.env.NODE_ENV === 'test'
    ? ConnBuilder.getTestDB()
    : ConnBuilder.getProductionDB();

@Module({
  imports: [MongooseModule.forRoot(connString), SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
