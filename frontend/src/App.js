import './App.css';
import { Jobs } from './components/Jobs.js';
import { LoginForm } from './components/LoginForm.js';
import { NaviBar } from './components/NaviBar.js';
import { RegisterForm } from './components/RegisterForm.js';
import { Roles } from './components/Roles.js';
import { WithAuthorize } from './components/WithAuthorize.js';
import { DataContextProvider } from './contexts/DataContextProvider.js';
import { UserContextProvider } from './contexts/UserContextProvider.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
        <BrowserRouter>
          <UserContextProvider>
            <NaviBar/>
            <DataContextProvider>{/* Provides job data */}
              <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/roles" element={<WithAuthorize roles={['admin']}><Roles/></WithAuthorize>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/jobs" element={<WithAuthorize><Jobs/></WithAuthorize>}/>
              </Routes> 
            </DataContextProvider>
          </UserContextProvider>
        </BrowserRouter>
  )
}

export default App;
