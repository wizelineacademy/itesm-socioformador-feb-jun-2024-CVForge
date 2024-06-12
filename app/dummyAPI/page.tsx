"use client"
import { getAllUsers } from "@/services/userService"
import { useEffect, useState } from "react"

interface User {
  users_id: string
  email: string
  password: string
  verification: boolean | null
  is_active: boolean | null
  last_login: Date | null
  created_at: Date | null
  updated_at: Date | null
}

const TestServicesPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers()
      setUsers(usersData)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.users_id}>1.{user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default TestServicesPage
