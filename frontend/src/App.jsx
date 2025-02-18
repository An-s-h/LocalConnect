import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages.jsx/Home'
import Categories from './Pages.jsx/Categories'
import ContactUs from './Pages.jsx/ContactUs'
import AddBusiness from './Pages.jsx/AddBusiness'
import BusinessComponent from './Pages.jsx/BusinessComponent'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/add-business' element={<AddBusiness/>} />
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/bc' element={<BusinessComponent/>}/>
    </Routes>
  )
}

export default App
