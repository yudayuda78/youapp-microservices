import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class ChatDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  message: string;
}
