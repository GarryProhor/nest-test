import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  createUser(@Body() dto: UserDTO) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
}
