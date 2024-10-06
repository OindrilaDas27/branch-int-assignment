import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserSignup from './pages/UserSignup/UserSignup';
import UserLogin from './pages/UserLogin/UserLogin';
import CreateIssue from './pages/CreateIssue/CreateIssue';
import Chats from './pages/Chats/Chats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin /> } />
        <Route path='/' element={<CreateIssue />} />
        <Route path='/chats' element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
