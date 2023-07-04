import { memo, useState, useCallback, useMemo, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";

//Users -> 1. UserList, 2.UserView

export default function Users() {
  const history = useHistory();
  const { users, setUsers } = useContext(UserContext);
  const [query, setQuery] = useState("");

  // const femaleUsers = useMemo(() => {
  //   for (let i = 0; i < 10000000000; i++) {}

  //   return users.filter((u) => u.gender.toLowerCase() === "female");
  // }, [users]);
  const femaleUsers = useMemo(() => {
    return users.filter((u) => {
      for (let i = 0; i < 10000000; i++) {}
      return u.gender.toLowerCase() === "female";
    });
  }, [users]);

  const [user, setUser] = useState(null);

  const [count, setCount] = useState(0);

  const handleEdit = (user) => {
    history.push(`/${user.id}`);
  };

  const handleDelete = (user) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? this action is permanent"
      )
    ) {
      setUsers((users) => {
        return users.filter((u) => u.id !== user.id);
      });
    }
  };

  const handleClick = useCallback((user) => {
    setUser(user);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 px-4 py-1 block my-4"
        onClick={() => setCount((count) => count + 1)}
      >
        You Clicked {count}
      </button>
      <SampleComponent />

      <UserList
        users={femaleUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClick={handleClick}
      />

      <UserView user={user} />
    </div>
  );
}

const UserView = ({ user }) => {
  if (!user) {
    return <div>Please select an user to display its details</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>{user.name}</th>
        </tr>
        <tr>
          <th>Gender</th>
          <th>{user.gender}</th>
        </tr>
        <tr>
          <th>Followers</th>
          <th>{user.followers}</th>
        </tr>
      </thead>
    </table>
  );
};

const UserList = ({ users, onClick, onEdit, onDelete }) => {
  useEffect(() => {
    if (users.length) {
      onClick(users[0]);
    }
  }, [users, onClick]);

  return (
    <table>
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Is Admin</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <UserItem
              onClick={onClick}
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const UserItem = memo(function UserItem({ onClick, user, onEdit, onDelete }) {
  console.log("User Item");
  return (
    <tr onClick={() => onClick(user)}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.gender}</td>
      <td>{user.isAdmin}</td>
      <td>
        <button onClick={() => onEdit(user)}>Edit</button>
        {/* <Link to={`/${user.id}`}>Edit</Link> */}
        <button onClick={() => onDelete(user)}>Delete</button>
      </td>
    </tr>
  );
});

function SampleComponent() {
  console.log("Sample Component");
  return <div>Dummy Component</div>;
}
