import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Ini yang bikin modul lain bisa pakai Prisma
})
export class PrismaModule {}