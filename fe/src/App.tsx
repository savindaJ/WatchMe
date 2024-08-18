import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import AdminLogin from './admin/login/AdminLogin';
import AdminHome from './admin/home/AdminHome';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin-home/*" element={<AdminHome/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
