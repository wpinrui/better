import "./App.css";
import Login from "./Auth/Login.js";
import Register from "./Auth/Register.js";
import Reset from "./Auth/Reset.js";
import {
    PATH_LOGIN,
    PATH_DASHBOARD,
    PATH_REGISTER,
    PATH_RESET,
} from "./Paths.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const appDiv = (
    <div className="App">
        <Router>
            <Routes>
                <Route path={PATH_LOGIN} element={<Login />} />
                <Route path={PATH_REGISTER} element={<Register />} />
                <Route path={PATH_RESET} element={<Reset />} />
            </Routes>
        </Router>
    </div>
);

function App() {
    return appDiv;
}

export default App;
