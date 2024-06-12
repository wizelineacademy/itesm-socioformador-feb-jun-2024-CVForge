'use client'

import { useState } from 'react'

export default function Home() {
  const [users, setUsers] = useState<any>([])

  const createUser = async () => {
    const userData = {
      first_name: 'Test',
      last_name: 'lol',
      email: 'example@mail.com',
      password: '123',
    }

    const response = await fetch('/api/db/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()
    console.log(data)
  }

  const fetchUsers = async () => {
    const response = await fetch('/api/db/user')
    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  return (
    <main className="w-full h-full">
      <button onClick={createUser}>Create User</button>
      <button onClick={fetchUsers}>Get Users</button>
      <div>
        {users.map((user: any, index: number) => (
          <div key={index}>
            {user.email} - {user.first_name} - {user.password}
          </div>
        ))}
      </div>
    </main>
  )
}
