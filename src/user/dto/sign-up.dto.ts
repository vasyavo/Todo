import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
