import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";
import "../css/App.css";
import useTasks from "../hooks/useTasks.js";

function App() {
  const [currentSection, setCurrentSection] = React.useState("tasks");
  const { isLoading, tasks } = useTasks();

  return (
    <div className="App">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="App-right">
        <Header />
        <Main />
        <div>{currentSection}</div>
        <div>{isLoading ? "Loading" : JSON.stringify(tasks, null, 2)}</div>
      </div>
    </div>
  );
}

export default App;
