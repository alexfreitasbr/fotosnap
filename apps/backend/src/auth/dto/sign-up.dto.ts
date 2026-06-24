import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export class SignUpDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email!: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
  })
  password!: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword!: string;
}
