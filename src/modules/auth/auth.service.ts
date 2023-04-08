import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(dto: UserDTO): Promise<UserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    return existUser;
  }
}
