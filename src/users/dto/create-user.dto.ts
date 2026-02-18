import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client'; // Import Role dari Prisma Client

export class CreateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role, default: Role.USER }) // Gunakan enum di sini
  role?: Role;
}