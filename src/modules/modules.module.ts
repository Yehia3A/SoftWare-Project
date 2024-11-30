import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './modules.schema';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]),
  ],
  providers: [ModulesService],
  controllers: [ModulesController],
  exports: [ModulesService],
})
export class ModulesModule { }
