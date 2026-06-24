import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export class SignInDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email!: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
  })
  password!: string;
}
