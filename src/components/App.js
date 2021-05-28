import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";
import "../css/App.css";

function App() {
  const [currentSection, setCurrentSection] = React.useState("applications");
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
      </div>
    </div>
  );
}

export default App;
