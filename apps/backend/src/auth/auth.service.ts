import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma';
import { SignInDto, SignUpDto } from './dto';
import { AuthResponse, AuthUser } from './auth.types';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user and returns an access token.
   *
   * @param signUpDto Sign-up payload from the client.
   * @returns Authenticated user and JWT access token.
   */
  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await hash(signUpDto.password, SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return this.buildAuthResponse(user);
  }

  /**
   * Authenticates a user with email and password.
   *
   * @param signInDto Sign-in payload from the client.
   * @returns Authenticated user and JWT access token.
   */
  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  }

  private buildAuthResponse(user: AuthUser): AuthResponse {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { user, accessToken };
  }
}
