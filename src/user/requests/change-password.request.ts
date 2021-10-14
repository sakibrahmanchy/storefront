import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequest {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MinLength(6)
  previous_password: string;

  @IsNotEmpty()
  @MinLength(6)
  new_password: string;

  @IsNotEmpty()
  @MinLength(6)
  repeat_password: string;
}
