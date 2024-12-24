import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ProgressesModule } from '../progress/progress.module'; // Import ProgressesModule
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleDocument = Modules & Document;

@Schema({ timestamps: true })
export class Modules {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ required: true })
  createdBy: string;
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema }]), // Correct import
    ProgressesModule, // Add ProgressesModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}