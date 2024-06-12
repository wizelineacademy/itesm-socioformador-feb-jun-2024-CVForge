import prisma from '@/lib/prisma'
import { createUser, findUserById, getAllUsers } from '@/services/userService' // Assuming you export these functions from a service file
import { User } from '@/types/user' // Import the User type if needed, adjust path as required
import { expect } from '@jest/globals'

// Type-safe mock setup
jest.mock('@/lib/prisma', () => ({
  users: {
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where.users_id === '1') {
        return Promise.resolve({
          users_id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        })
      } else {
        return Promise.resolve(null)
      }
    }),
    findMany: jest.fn().mockImplementation(() =>
      Promise.resolve([
        { users_id: '1', name: 'John Doe', email: 'john@example.com' },
        { users_id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ]),
    ),
    create: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ users_id: '3', ...data.data }),
      ),
  },
}))

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('findUserById should return a user', async () => {
    const mockUserId = '1'
    const expectedUser = {
      users_id: mockUserId,
      name: 'John Doe',
      email: 'john@example.com',
    }

    // Perform the function call
    const user = await findUserById(mockUserId)

    // Check that the returned value matches the expected mock value
    expect(user).toEqual(expectedUser)
    // Verify the method was called correctly
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { users_id: mockUserId },
    })
  })

  test('getAllUsers should return all users', async () => {
    const expectedUsers = [
      { users_id: '1', name: 'John Doe', email: 'john@example.com' },
      { users_id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ]

    // Perform the function call
    const users = await getAllUsers()

    // Check that the returned value matches the expected mock value
    expect(users).toEqual(expectedUsers)
    // Verify the method was called correctly
    expect(prisma.users.findMany).toHaveBeenCalledWith()
  })

  test('createUser should add a new user', async () => {
    const newUserData = {
      name: 'Alice Wonderland',
      email: 'alice@example.com',
      password: 'SecurePass123!', // Assuming a password is required
      verification: false, // Assuming a verification status is required
      is_active: true, // Assuming an active status flag is required
    }

    const expectedUser = {
      users_id: '3',
      name: 'Alice Wonderland',
      email: 'alice@example.com',
      password: 'SecurePass123!',
      verification: false,
      is_active: true,
      last_login: expect.any(Date),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }

    // Call the function under test
    const user = await createUser(newUserData)

    // Assertions to check both the result and the call to the Prisma create method
    expect(user).toEqual(expectedUser)
    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        ...newUserData,
        last_login: expect.any(Date),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    })
  })
})
