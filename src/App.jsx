import { Route, BrowserRouter, Routes } from 'react-router-dom';
import VistaLogin from './views/MainPage.jsx';
import React from 'react';

function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<VistaLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
