import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'My First Article' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty({ required: false, example: 'Short description' })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  description?: string;

  @ApiProperty({ example: 'Full article content here...' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean = false;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
