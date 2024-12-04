import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { Response, ResponseSchema } from './response.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Response.name, schema: ResponseSchema }])],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService], // Export if other modules need to use ResponsesService
})
export class ResponsesModule {}
