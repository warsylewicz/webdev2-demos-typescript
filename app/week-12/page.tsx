"use client";

import { useState, useEffect, FormEvent } from "react";
import { set } from "zod";

// define user type for TypeScript
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Page() {
  const [users, setUsers] = useState([] as User[]);
  const [selectedUser, setSelectedUser] = useState({} as User);
  const [newUser, setNewUser] = useState({ name: "", email: "" } as User);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const getUsers = async (): Promise<User[]> => {
    // GET /api/users
    const response = await fetch("/week-12/api/users");
    console.log(response);
    const data = await response.json();
    return data;
  };

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // PUT /api/users/:id
    await fetch(`/week-12/api/users/${selectedUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedUser),
    });
    const users = await getUsers();
    setUsers(users);
  };

  const deleteUser = async (id: number) => {
    // DELETE /api/users/:id
    await fetch(`/week-12/api/users/${id}`, {
      method: "DELETE",
    });
    setSelectedUser({} as User);
    const users = await getUsers();
    setUsers(users);
  };

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // POST /api/users
    await fetch("/week-12/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser, role: "user" }),
    });
    const users = await getUsers();
    setUsers(users);
    setNewUser({ name: "", email: "" } as User);
  };

  return (
    <main className="m-2">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <p>Demonstration of consuming the API endpoints for managing users.</p>
      <table className="border-collapse border border-gray-800 w-96">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={selectedUser.id ? "" : "invisible"}>
        <h2 className="text-xl font-bold">User Details</h2>
        <form onSubmit={(e) => updateUser(e)}>
          <label>
            Name:
            <input
              type="text"
              className="border border-gray-800"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              className="border border-gray-800"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Save
          </button>
        </form>
        <button
          onClick={() => deleteUser(selectedUser.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>

      <h2 className="text-xl font-bold">Add User</h2>
      <form onSubmit={(e) => addUser(e)}>
        <label>
          Name:
          <input
            type="text"
            className="border border-gray-800"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            className="border border-gray-800"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </form>
    </main>
  );
}
