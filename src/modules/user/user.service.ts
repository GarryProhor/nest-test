import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UserDTO } from './dto';
import { Watchlist } from '../watchlist/model/watchlist.model';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (e) {
      throw new Error(e);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email: email },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  async createUser(dto: UserDTO): Promise<UserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
      });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false,
        },
      });
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { email: email } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email: email } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
