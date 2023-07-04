import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Users from "./components/Users";
import "./App.css";
import ManageUser from "./components/ManageUser";
import UserProvider from "./contexts/UserProvider";
import useDimension from "./hooks/useDimension";
import TodoList from "./components/TodoList";
const Users = React.lazy(() => import("./components/Users"));

function App() {
  const [width, height] = useDimension();

  console.log("browser dimension", width, height);

  return (
    <UserProvider>
      <Suspense fallback={<div>Loading....</div>}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <TodoList />
            </Route>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:id">
              <ManageUser />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </UserProvider>
  );
}

export default App;
