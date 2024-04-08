"use client";

import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any>([]);

  const createUser = async () => {
    const userData = {
      user_id: "5da644ba-b969-4d6e-9417-b88865464ffb",
      email: "example@mail.com",
      first_name: "Test"
    };

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
  };

  const fetchUsers = async () => {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  return (
    <main className="w-full h-full">
      {/* <MainLogo /> */}
      <button onClick={createUser}>Create User</button>
      <button onClick={fetchUsers}>Get Users</button>
      <div>
        {users.map((user: any, index: number) => (
          <div key={index}>
            {user.email} - {user.first_name}
          </div>
        ))}
      </div>
    </main>
  );
}