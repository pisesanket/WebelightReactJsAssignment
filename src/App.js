import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1 style={{ padding: "10px" }}>Most Starred Repos</h1>
        <RepoList />
      </div>
    </Provider>
  );
};

export default App;
