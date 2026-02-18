import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Aktifkan Validasi Input (ValidationPipe)
  // Memastikan data yang masuk sesuai dengan aturan DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 2. Aktifkan Serializer
  // Bertugas menyembunyikan password saat data user dikirim ke luar
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 3. Setup Swagger (Dokumentasi API)
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .addBearerAuth() // ✅ WAJIB ADA agar muncul tombol Authorize (Gembok)
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 4. Daftarkan Exception Filter
  // Untuk menangani error database agar pesan errornya lebih rapi
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();