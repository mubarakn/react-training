import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

export default function ManageUser() {
  const history = useHistory();
  const params = useParams();
  const { users, setUsers } = useContext(UserContext);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("params", params, users);
    const user = users.find((u) => u.id === parseInt(params.id));
    setName(user.name);
    setGender(user.gender);
    setIsAdmin(user.isAdmin);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      id:
        params.id === "new"
          ? Math.max(users.map((u) => u.id)) + 1
          : parseInt(params.id),
      name,
      gender,
      isAdmin,
    };

    if (params.id === "new") {
      setUsers((users) => {
        return [...users, user];
      });
    } else {
      setUsers((users) => {
        return users.map((u) => {
          if (u.id === parseInt(params.id)) {
            return user;
          }
          return u;
        });
      });
    }

    history.goBack();
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-200">
      <form className="bg-white p-4 space-y-2" onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold text-blue-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-500"
          />
        </div>
        <div>
          <label className="font-semibold text-blue-500">Gender</label>
          <select
            className="border border-gray-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Is Admin</label>
          <label>
            <input
              type="radio"
              name="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(!isAdmin)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="admin"
              checked={!isAdmin}
              onChange={(e) => setIsAdmin(!isAdmin)}
            />{" "}
            No
          </label>
        </div>
        <button className="bg-blue-500 text-white block ml-auto px-4 py-1">
          Submit
        </button>
      </form>

      {Object.keys(errors).length > 0 && JSON.stringify(errors)}
    </div>
  );
}
