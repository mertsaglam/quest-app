import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import User from './components/user/User';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/users/:userId" element={<User/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;