import { ToggleLeft } from "lucide-react";
import { ToggleRight } from "lucide-react";
import { useState } from "react";

const Train = () => {
  // const users0 = [
  //   { id: 1, name: "Ahmed", active: true },
  //   { id: 2, name: "Ali", active: true },
  //   { id: 3, name: "Omar", active: true },
  // ];

  const [users, setUsers] = useState([
    { id: 1, name: "Ahmed", active: true },
    { id: 2, name: "Ali", active: true },
    { id: 3, name: "Omar", active: true },
  ]);

  const [nOfUsers, setNOfUsers] = useState(
    users.filter((u) => u.active === true).length,
  );

  const [search, setSearch] = useState("");
  const filterdUsers = users.filter((u) =>
    u.name.toLocaleLowerCase().includes(search),
  );
  console.log(filterdUsers);

  const toggleActive = (id) => {
    users.map((u) => (u.id === id ? (u.active = !u.active) : u));
    console.log(filterdUsers);
  };

  return (
    <div className="flex gap-2">
      <p>there are {nOfUsers} users active</p>
      <div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {filterdUsers.map((user) => {
          return (
            <li key={user.id}>
              <p>{user.name}</p>
              {user.active ? (
                <ToggleRight onClick={() => toggleActive(user.id)} />
              ) : (
                <ToggleLeft onClick={() => toggleActive(user.id)} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Train;
