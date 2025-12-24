import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateProfileDto {
  userId: string;

  @IsString()
  name: string;

  @IsDateString()
  birthday: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  @IsString()
  horoscope?: string;

  @IsOptional()
  @IsString()
  zodiac?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsArray()
  interests?: string[];
}
