import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto';
import { AppError } from '../../common/constants/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  async createUser(dto: UserDTO): Promise<UserDTO> {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }
}
