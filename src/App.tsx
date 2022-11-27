import { useAtom } from "jotai";
import { ReactElement } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
import { IUsers, parsedLikes, usersAtom } from "./store";

function App(): ReactElement {
  const [users] = useAtom<IUsers[]>(usersAtom);
  return (
    <div
      className={`border rounded-md relative`}
      style={{ width: 350, height: 500 }}
    >
      {users.map((userData, idx) => (
        <PersonCard {...userData} idx={idx} />
      ))}
    </div>
  );
}
export default App;
