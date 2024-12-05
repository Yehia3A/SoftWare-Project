import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Modules, ModulesSchema  } from './modules.schema';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})

export class ModulesModule {}

