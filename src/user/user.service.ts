import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/user.entity';
import { SignUpDto } from '@user/dto/sign-up.dto';
import { SignInDto } from '@user/dto/sign-in.dto';

export interface ITokenInfo {
  accessToken: string;
  user: Omit<User, 'password'>;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<ITokenInfo> {
    const user = await this.validateUser(signInDto);
    return this.generateToken(user);
  }
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const candidate = await this.userRepository.findOneBy({
      email: signUpDto.email,
    });
    if (candidate) {
      throw new BadRequestException(
        `User with email "${signUpDto.email}" is already existed`,
      );
    }
    const hashPassword = await bcrypt.hash(signUpDto.password, 5);
    const user = await this.userRepository.create({
      ...signUpDto,
      password: hashPassword,
    });
    await this.userRepository.save(user);
  }
  private async generateToken(user: User): Promise<ITokenInfo> {
    const { password, ...payload } = user;
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }
  private async validateUser(signInDto: SignInDto): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });
    const passwordEquals = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }
}
