import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import User from "./components/user/User";
import Home from "./components/home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/:userId" element={<User />}></Route>
          <Route
            path="/auth"
            element={
              localStorage.getItem("currentUser") != null ? (
                <Navigate to="/" />
              ) : (
                <Auth />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
