import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";
import "../css/App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="App-right">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
