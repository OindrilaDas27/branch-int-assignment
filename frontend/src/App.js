import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserSignup from './pages/UserSignup/UserSignup';
import UserLogin from './pages/UserLogin/UserLogin';
import CreateIssue from './pages/CreateIssue/CreateIssue';
import Chats from './pages/Chats/Chats';
import AgentLogin from './pages/AgentLogin/AgentLogin';
import AgentPortal from './pages/AgentPortal/AgentPortal';
import AgentChat from './pages/AgentChat/AgentChat';
import Waiting from './components/Waiting/Waiting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/agent-login' element={<AgentLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin /> } />
        <Route path='/' element={<CreateIssue />} />
        <Route path='/chats' element={<Waiting />} />
        <Route path='/chats/:threadId' element={<Chats />} />
        <Route path='/agent-portal' element={<AgentPortal />} />
        <Route path='/agent-chat/:threadId' element={<AgentChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
