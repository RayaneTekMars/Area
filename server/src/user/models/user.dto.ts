import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;
}