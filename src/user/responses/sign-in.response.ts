import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ITokenInfo } from '@user/user.service';
import { User } from '@user/user.entity';

export class SignInResponse implements ITokenInfo {
  @ApiProperty()
  user: User;

  @ApiProperty()
  @IsString()
  accessToken: string;
}
