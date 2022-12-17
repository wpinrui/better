import "./App.css";
import Login from "./Auth/Login.js";
import Register from "./Auth/Register.js";
import Reset from "./Auth/Reset.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const appDiv = (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </Router>
    </div>
);

function App() {
    return appDiv;
}

export default App;
