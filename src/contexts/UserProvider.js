import { createContext, useEffect, useState } from "react";

export const UserContext = createContext([]);

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        id: i + 1,
        name: `User ${i + 1}`,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        isAdmin: Math.random() > 0.5,
      };
      userList.push(user);
    }
    setUsers(userList);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
