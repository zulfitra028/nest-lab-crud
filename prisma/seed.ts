import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // 1. Giling password menjadi hash yang aman
  const passwordAdmin = await bcrypt.hash('123456', roundsOfHashing);
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  // 2. Update akun Admin dengan password baru (Wajib ada update: { password: ... })
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: { password: passwordAdmin }, 
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: passwordAdmin,
    },
  });

  // 3. Update akun Sabin
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: { password: passwordSabin },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  // 4. Update akun Alex
  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: { password: passwordAlex },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  // 5. Kembalikan Artikel (Post 1)
  const post1 = await prisma.article.upsert({
    where: { title: 'Welcome to My Blog' },
    update: {},
    create: {
      title: 'Welcome to My Blog',
      description: 'Introduction article',
      body: 'This is the first article.',
      published: true,
      authorId: admin.id,
    },
  });

  // 6. Kembalikan Artikel (Post 2)
  const post2 = await prisma.article.upsert({
    where: { title: 'Second Article' },
    update: {},
    create: {
      title: 'Second Article',
      description: 'Another article example',
      body: 'This is the second article content.',
      published: false,
      authorId: admin.id,
    },
  });

  console.log('Seed data berhasil dimasukkan:', { admin, post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });