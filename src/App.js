import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyMeeting from './pages/MyMeeting';
import MeetingroomList from './components/MeetingroomList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main/:id" element={<MainPage />} />
          <Route path="/mymeeting" element={<MyMeeting />} />
          <Route path="/meeting-rooms" element={<MeetingroomList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
