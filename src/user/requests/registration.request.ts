import {
  // IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationRequest {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  last_name: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  // @IsDateString()
  dob: string;

  employer_name?: string;

  address?: string;

  rights?: number[];
}
