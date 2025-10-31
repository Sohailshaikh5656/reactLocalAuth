import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
