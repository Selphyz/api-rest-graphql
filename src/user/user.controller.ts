import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO, UserRO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('api/users')
  async showAllUsers(): Promise<UserRO[]> {
    return await this.userService.showAll();
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: UserDTO): Promise<UserRO> {
    return await this.userService.login(data);
  }
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: UserDTO): Promise<UserRO> {
    return await this.userService.register(data);
  }
}
