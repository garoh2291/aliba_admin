import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouteComponents } from "./routes";
import { EditContextProvider } from "./context/provider";

function App() {
  return (
    <EditContextProvider>
      <BrowserRouter>
        <div className="App">
          <RouteComponents />
        </div>
      </BrowserRouter>
    </EditContextProvider>
  );
}

export default App;
