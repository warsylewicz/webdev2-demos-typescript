import type { User } from "./types/index.d.ts";

export default async function Page() {
  // /week-11/part2/api
  // GET
  async function fetchUsers() {
    const response = await fetch(
      "http://localhost:3000/week-11/part-2/api/users"
    );
    const users: User[] = await response.json();

    return users;
  }

  const users = await fetchUsers();

  // POST
  async function createUser() {
    const user = {
      name: "Carl",
      age: 25,
    };

    const response: Response = await fetch(
      "http://localhost:3000/week-11/part-2/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    try {
      const user: User = await response.json();
      return user;
    } catch (error) {
      return null;
    }
  }

  const newUser = await createUser();

  // PUT
  async function replaceUser() {
    const response: Response = await fetch(
      "http://localhost:3000/week-11/part-2/api/users/2",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Bobby",
          age: 31,
        }),
      }
    );

    try {
      const user: User = await response.json();
      return user;
    } catch (error) {
      return null;
    }
  }

  await replaceUser();

  // PATCH
  async function updateUser() {
    const response: Response = await fetch(
      "http://localhost:3000/week-11/part-2/api/users/2",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Bobby",
        }),
      }
    );

    try {
      const user: User = await response.json();
      return user;
    } catch (error) {
      return null;
    }
  }

  await updateUser();

  // DELETE
  async function deleteUser() {
    const response: Response = await fetch(
      "http://localhost:3000/week-11/part-2/api/2",
      {
        method: "DELETE",
      }
    );

    try {
      const user: User = await response.json();
      return user;
    } catch (error) {
      return null;
    }
  }

  await deleteUser();

  return (
    <main>
      <h1>Week 11 Part 2</h1>
      <div>
        <h2>Get Users</h2>
        <ul>
          {users?.map((user: User) => {
            return (
              <li key={user.id}>
                {user.id}: {user.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2>Create User</h2>
        <p>
          {newUser?.id}: {newUser?.name}
        </p>
      </div>
    </main>
  );
}
