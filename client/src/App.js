import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './elements/Home'
import Read from './elements/Read'
import Create from './elements/Create'
import Edit from './elements/Edit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add_product' element={<Create />} />
        <Route path='/edit_product/:barcode' element={<Edit />} />
        <Route path='/get_product/:barcode' element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App