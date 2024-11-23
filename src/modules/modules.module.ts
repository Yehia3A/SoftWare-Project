import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './modules.schema'; // Import the schema
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]), // Register the schema
  ],
  providers: [ModulesService],
  controllers: [ModulesController],
  exports: [ModulesService], // Expose the service if needed by other modules
})
export class ModulesModule {}