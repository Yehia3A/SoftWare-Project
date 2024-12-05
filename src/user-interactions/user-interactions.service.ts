import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInteraction, UserInteractionDocument } from './user-interactions.schema';
import { CreateUserInteractionDto } from './dto/create-user-interactions.dto';
import { UpdateUserInteractionDto } from './dto/update-user-interactions.dto';

@Injectable()
export class UserInteractionsService {
    constructor(
        @InjectModel(UserInteraction.name)
        private readonly userInteractionModel: Model<UserInteractionDocument>,
    ) {}

    async createUserInteraction(createDto: CreateUserInteractionDto): Promise<UserInteraction> {
        const newUserInteraction = new this.userInteractionModel(createDto);
        return newUserInteraction.save();
    }

    async getAllUserInteractions(): Promise<UserInteraction[]> {
        return this.userInteractionModel.find().exec();
    }

    async getUserInteractionById(id: string): Promise<UserInteraction> {
        const interaction = await this.userInteractionModel.findById(id).exec();
        if (!interaction) {
            throw new NotFoundException(`User interaction with ID: ${id} not found`);
        }
        return interaction;
    }

    async updateUserInteraction(
        id: string,
        updateDto: UpdateUserInteractionDto,
    ): Promise<UserInteraction> {
        const updatedInteraction = await this.userInteractionModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!updatedInteraction) {
            throw new NotFoundException(`User interaction with ID: ${id} not found`);
        }
        return updatedInteraction;
    }

    async deleteUserInteraction(id: string): Promise<{ message: string }> {
        const result = await this.userInteractionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`User interaction with ID: ${id} not found`);
        }
        return { message: `User interaction with ID: ${id} successfully deleted` };
    }
}