import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";
import "../css/App.css";
import useTenantGUID from "../hooks/useTenantGUID.js";

function App() {
  const [currentSection, setCurrentSection] = React.useState("applications");
  const tenantGUID = useTenantGUID();

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
        <div>{tenantGUID || "no"}</div>
      </div>
    </div>
  );
}

export default App;
