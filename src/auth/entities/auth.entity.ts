import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string; // Ini adalah tempat menyimpan token JWT nanti
}