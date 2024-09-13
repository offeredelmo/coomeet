import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateIngredientsDto, UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findByEmail(@Body() email: string) {
    return await this.usersService.findByEmail(email);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Get('ingredients/:id')
  async listIngredients(@Param("id") user_id:string) {
    console.log("si")
    console.log(user_id)
    return await this.usersService.listIngredients(user_id)
  }

  @Post('ingredients')
  async updateIngredients(@Body() updateIngredientsDto: UpdateIngredientsDto) {
    return await this.usersService.updateIngredients(updateIngredientsDto)
  }
}
