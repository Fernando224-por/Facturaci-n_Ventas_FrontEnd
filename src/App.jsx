import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import VistaLogin from './views/MainPage.jsx';
import Dashboard from './views/Dashboard.jsx';
import ResetPassword from './views/EnterEmailCP.jsx';
import CodeInput from './views/ConfirmCodeCP.jsx'
import ConfirmPassword from './views/NewPasswordCP.jsx';
import ProtectedRoutes from './hooks/ProtectedRoute.jsx'
function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VistaLogin />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path='/Code' element={<CodeInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
