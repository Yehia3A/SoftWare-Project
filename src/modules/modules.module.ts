import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Module as ModuleSchema, ModuleSchema  } from './modules.schema';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: ModuleSchema.name, schema: ModuleSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})

export class ModulesModule {}

