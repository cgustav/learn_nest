import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_SERVICE_USERNAME}:${process.env.DATABASE_SERVICE_PASSWORD}` +
        `@localhost:${process.env.DB_PORT_RANGE_START}/${process.env.DATABASE_DB}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
