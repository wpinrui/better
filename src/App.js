import "./App.css";
import Login from "./Auth/Login.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const appDiv = (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    </div>
);

function App() {
    return appDiv;
}

export default App;
