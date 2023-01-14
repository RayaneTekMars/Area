import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserDto } from '../models/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  add(@Body() user: UserDto): Observable<UserDto> {
    return this.userService.add(user);
  }

  @Get()
  findAll(): Observable<UserDto[]> {
    return this.userService.findAll();
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    await this.userService.deleteUserById(id);
  }
  @Put(":id")
  async update(@Param('id') id: number, @Body() user: UserDto): Promise<any> {
    await this.userService.updateUser(id, user);
  }
}
