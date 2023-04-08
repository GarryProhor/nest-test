import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
