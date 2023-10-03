// import logo from './logo.svg';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/mobile/Header';
import Login from './components/mobile/Login';
import OTPverify from './components/mobile/OTPverify';
import Signup from './components/mobile/Signup';
import Profile from './components/mobile/Profile';
import Home from './components/mobile/Home';
import Location from './components/mobile/Location';
import Search from './components/mobile/Search';
import Favourite from './components/mobile/Favourite';
import Contact from './components/mobile/Contact';
import HomeD from './components/desktop/HomeD';
import NavbarD from './components/desktop/NavbarD';
import LoginD from './components/desktop/LoginD';
import SignupD from './components/desktop/SignupD';
import JoinusD from './components/desktop/JoinusD';
import Address from './components/mobile/Address';
import DashboardNav from './components/desktop/DashboardNav';
import AddFoodItems from './components/desktop/AddFoodItems';
import Order from './components/mobile/Order';
import OrderSucces from './components/mobile/OrderSuccess';
import ResetPassword from './components/mobile/ResetPassword';
import AboutUs from './components/mobile/AboutUs';
import Checkout from './components/mobile/Checkout';

function App() {

  const mobile = ()=>{
    return (
      <div>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/verify' element={<OTPverify />} exact />
            <Route path='/signup' element={<Signup />} exact />
            <Route path='/profile' element={<Profile />} exact />
            <Route path='/search' element={<Search />} exact />
            <Route path='/favourite' element={<Favourite />} exact />
            <Route path='/location' element={<Location />} exact />
            <Route path='/contact' element={<Contact />} exact />
            <Route path='/address' element={<Address />} exact />
            <Route path='/order' element={<Order />} exact />
            <Route path='/orderSuccess' element={<OrderSucces />} exact />
            <Route path='/resetPassword' element={<ResetPassword />} exact />
            <Route path='/aboutus' element={<AboutUs />} exact />
            <Route path='/about' element={<AboutUs />} exact />
            <Route path='/checkout' element={<Checkout />} exact />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  const desktop = ()=>{
    return (
      <div>
        <BrowserRouter>
          <NavbarD />
          <Routes>
            <Route path='/' element={<HomeD />} exact />
            <Route path='/login' element={<LoginD />} exact />
            <Route path='/verify' element={<OTPverify />} exact />
            <Route path='/signup' element={<SignupD />} exact />
            <Route path='/profile' element={<Profile />} exact />
            <Route path='/search' element={<Search />} exact />
            <Route path='/favourite' element={<Favourite />} exact />
            <Route path='/location' element={<Location />} exact />
            <Route path='/contact' element={<Contact />} exact />
            <Route path='/address' element={<Address />} exact />
            <Route path='/joinus' element={<JoinusD />} exact />
            <Route path='/dashboard' element={<DashboardNav />} exact />
            <Route path='/addFoodItems' element={<AddFoodItems />} exact />
            <Route path='/order' element={<Order />} exact />
            <Route path='/orderSuccess' element={<OrderSucces />} exact />
            <Route path='/resetPassword' element={<ResetPassword />} exact />
            <Route path='/aboutus' element={<AboutUs />} exact />
            <Route path='/about' element={<AboutUs />} exact />
            <Route path='/checkout' element={<Checkout />} exact />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  return (
    (window.innerWidth<=800)?mobile():desktop()
  );
}

export default App;
