import "./App.css";
import Login from "./Pages/Auth/Login.js";
import Register from "./Pages/Auth/Register.js";
import Reset from "./Pages/Auth/Reset.js";
import Logo from "./Frontend/Logo.js";
import {
    PATH_LOGIN,
    PATH_DASHBOARD,
    PATH_REGISTER,
    PATH_RESET,
} from "./Paths.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.js";

const appDiv = (
    <div className="App">
        {Logo}
        <Router>
            <Routes>
                <Route path={PATH_LOGIN} element={<Login />} />
                <Route path={PATH_REGISTER} element={<Register />} />
                <Route path={PATH_RESET} element={<Reset />} />
                <Route path={PATH_DASHBOARD} element={<Dashboard />} />
            </Routes>
        </Router>
    </div>
);

function App() {
    return appDiv;
}

export default App;
