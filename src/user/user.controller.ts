import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ITokenInfo, UserService } from '@user/user.service';
import { Public } from '@user/decorators/public.decorator';
import { SignInDto } from '@user/dto/sign-in.dto';
import { SignUpDto } from '@user/dto/sign-up.dto';
import { User } from '@user/user.entity';
import { SignInResponse } from '@user/responses/sign-in.response';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ description: 'Sign in' })
  @ApiUnauthorizedResponse({
    description: 'Incorrect email or password',
  })
  @ApiOkResponse({
    type: SignInResponse,
    description: 'JWT token and user additional information',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<ITokenInfo> {
    return this.userService.signIn(signInDto);
  }
  @ApiOperation({ description: 'Sign up' })
  @ApiBadRequestResponse({
    description: 'User with email "${email}" is already existed',
  })
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }
}
