import axios from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingroomList from '../components/MeetingroomList';
import ReservationMeeting from '../components/ReservationMeeting';
import MyMeetingHeader from '../components/MyMeetingHeader';
import MyCalendar from '../components/moment';

const cookie = new Cookies();

export const sendingSession = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem('user_id')) {
    axios
      .get('http://localhost:8080/main', {
        headers: {
          Authorization: `Bearer ${cookie.get('JSESSIONID')}`
        },
        withCredentials: true
      })
      .then((res) => console.log(res));
  }
};
function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reserveButton, setReserveButton] = useState(false);
  useEffect(() => {
    try {
      sendingSession();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <MainDiv>
      <div>
        <MeetingroomList />
      </div>
      <BodyDiv>
        <MeetingHeaderDiv>
          <MyMeetingHeader setModalOpen={setModalOpen} modalOpen={modalOpen} />
        </MeetingHeaderDiv>
        <MeetingBodyDiv>
          <MyCalendar
            setReserveButton={setReserveButton}
            reserveButton={reserveButton}
          />
          {reserveButton && <ReservationMeeting />}
        </MeetingBodyDiv>
      </BodyDiv>
    </MainDiv>
  );
}
const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #f1f5f8;
`;
const BodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const MeetingHeaderDiv = styled.div`
  width: 100%;
  height: 15%;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 26px;
  line-height: 32.55px;
`;
const MeetingBodyDiv = styled.div`
  width: 95%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
`;
export default MainPage;
