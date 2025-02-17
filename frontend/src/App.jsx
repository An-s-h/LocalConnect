import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages.jsx/Home'
import Categories from './Pages.jsx/Categories'
import AddBusiness from './Pages.jsx/AddBusiness'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/add-business' element={<AddBusiness/>} />
   
    </Routes>
  )
}

export default App
