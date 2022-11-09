import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyMeetingList from './pages/ViewMeetPage';
import MeetingroomList from './components/MeetingroomList';

const AppDiv = styled.div`
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <AppDiv>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main/login" element={<MainPage />} />
          <Route path="/mymeeting" element={<MyMeetingList />} />
          <Route path="/meeting-rooms" element={<MeetingroomList />} />
        </Routes>
      </BrowserRouter>
    </AppDiv>
  );
}

export default App;
