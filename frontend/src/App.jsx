import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- Add BrowserRouter
import Home from './Pages.jsx/Home';
import Categories from './Pages.jsx/Categories';
import ContactUs from './Pages.jsx/ContactUs';
import AddBusiness from './Pages.jsx/AddBusiness';
import BusinessComponent from './Pages.jsx/BusinessComponent';
import SignUp from './Pages.jsx/SignUp';
import LoginSignupSlider from './Pages.jsx/LoginSignupSlider';
import SignIn from './Pages.jsx/SignIn';
import AdminPage from './Pages.jsx/AdminPage';
import LocalSearchPage from './Pages.jsx/LocalSearchPage';
import { UserProvider } from './Contexts/UserContext';
import { LocationProvider } from './Contexts/LocationContext';
import ScrollToTop from './Components/ScrollToTop'; // Assuming this is made correctly

const App = () => {
  return (
   
      <LocationProvider>
        <UserProvider>

          <ScrollToTop /> {/* <-- Add this inside here */}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-business" element={<AddBusiness />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/bc" element={<BusinessComponent />} />
            <Route path="/business/:id" element={<BusinessComponent />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/jj" element={<LoginSignupSlider />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/search" element={<LocalSearchPage />} />
          </Routes>

        </UserProvider>
      </LocationProvider>
    
  );
}

export default App;
