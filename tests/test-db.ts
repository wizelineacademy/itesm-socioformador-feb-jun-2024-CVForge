const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function main() {
  try {
    // Reemplaza 'User' con el nombre real de tu modelo
    const allUsers = await prisma.users.findMany();
    console.log(allUsers);
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectarse a la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
