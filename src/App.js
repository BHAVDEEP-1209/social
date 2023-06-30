import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./Styles/App.scss"
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
