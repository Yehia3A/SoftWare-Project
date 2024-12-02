import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserInteractionsService } from './user-interactions.service';
import { CreateUserInteractionDto } from './dto/create-user-interactions.dto';
import { UpdateUserInteractionDto } from './dto/update-user-interactions.dto';

@Controller('user-interactions')
export class UserInteractionsController {
    constructor(private readonly service: UserInteractionsService) {}

    @Post()
    async createUserInteraction(@Body() createDto: CreateUserInteractionDto) {
        return this.service.createUserInteraction(createDto);
    }

    @Get()
    async getAllUserInteractions() {
        return this.service.getAllUserInteractions();
    }

    @Get(':id')
    async getUserInteractionById(@Param('id') id: string) {
        return this.service.getUserInteractionById(id);
    }

    @Patch(':id')
    async updateUserInteraction(
        @Param('id') id: string,
        @Body() updateDto: UpdateUserInteractionDto,
    ) {
        return this.service.updateUserInteraction(id, updateDto);
    }

    @Delete(':id')
    async deleteUserInteraction(@Param('id') id: string) {
        return this.service.deleteUserInteraction(id);
    }
}