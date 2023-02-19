import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouteComponents } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouteComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
