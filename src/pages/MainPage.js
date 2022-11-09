import axios from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';
import MeetingroomList from '../components/MeetingroomList';
import ReservationMeeting from '../components/ReservationMeeting';

const cookie = new Cookies();

export const sendingSession = () => {
  axios
    .get('http://localhost:8080/main', {
      headers: {
        Authorization: `Bearer ${cookie.get('JSESSIONID')}`
      },
      withCredentials: true
    })
    .then((res) => console.log(res));
};
function MainPage() {
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
      <div>
        <ReservationMeeting />
      </div>
    </MainDiv>
  );
}
const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default MainPage;
