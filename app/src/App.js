import Header from './layouts/Header';
import Footer from './layouts/Footer';

import AdminDashboardPage from './pages/AdminDashboardPage';
import ContactPage from './pages/ContactPage';
import Home from './pages/HomePage';
import PasswordSuggestionPage from './pages/PasswordSuggestionsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import TestPasswordPage from './pages/TestPasswordPage';
import UserRegisterPage from './pages/userRegisterPage';

import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contactUs" element={<ContactPage/>}/>
        <Route path="/passwordSuggestions" element={<PasswordSuggestionPage/>}/>
        <Route path="/adminLogin" element={<AdminLoginPage/>}/>
        <Route path="/userRegister" element={<UserRegisterPage/>}/>
        <Route path="/testPassword" element={<TestPasswordPage/>}/>
        <Route path="/adminDashboard" element={<AdminDashboardPage/>}/>
      </Routes>
      {/* <Main></Main> */}
      <Footer />
      
    </div>
  );
}

export default App;