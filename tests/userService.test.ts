import prisma from '@/lib/prisma';
import userServices from '@/services/userService'; // Adjust the import path to your services file

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  users: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('User Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findUserById should return a user', async () => {
    const mockUserId = '1';
    const mockUser = { users_id: mockUserId, name: 'John Doe' };
    prisma.users.findUnique.mockResolvedValue(mockUser);

    const user = await userServices.findUserById(mockUserId);
    expect(user).toEqual(mockUser);
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { users_id: mockUserId },
    });
  });

  test('getAllUsers should return all users', async () => {
    const mockUsers = [
      { users_id: '1', name: 'John Doe' },
      { users_id: '2', name: 'Jane Doe' },
    ];
    prisma.users.findMany.mockResolvedValue(mockUsers);

    const users = await userServices.getAllUsers();
    expect(users).toEqual(mockUsers);
    expect(prisma.users.findMany).toHaveBeenCalled();
  });

  test('createUser should add a new user', async () => {
    const newUser = { name: 'New User', email: 'newuser@example.com' };
    const mockUser = { ...newUser, users_id: '3', last_login: new Date(), created_at: new Date(), updated_at: new Date() };
    prisma.users.create.mockResolvedValue(mockUser);

    const user = await userServices.createUser(newUser);
    expect(user).toEqual(mockUser);
    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        ...newUser,
        last_login: expect.any(Date),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });
});
