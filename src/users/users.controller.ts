import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiTags, 
  ApiBearerAuth // ✅ 1. Tambahkan import ini
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🔓 POST /users — TERBUKA (untuk registrasi mahasiswa/admin baru)
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  // 🔒 GET /users — DILINDUNGI (Hanya yang login yang bisa lihat daftar user)
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // ✅ 2. Tambahkan ini agar token dikirim via Swagger
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  // 🔒 GET /users/:id — DILINDUNGI
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // ✅ 3. Tambahkan ini juga
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }
}