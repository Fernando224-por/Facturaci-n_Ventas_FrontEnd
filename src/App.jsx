import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import VistaLogin from './views/MainPage.jsx';
import Dashboard from './views/Dashboard.jsx';

function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VistaLogin />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
