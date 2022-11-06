import axios from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import MeetingroomList from '../components/MeetingroomList';
import ReservationMeeting from '../components/ReservationMeeting';

const cookie = new Cookies();

function MainPage() {
  const onClick = () => {
    axios
      .get('https://sdp-ourmeeting.herokuapp.com/main', {
        headers: {
          Authorization: `Bearer ${cookie.get('JSESSIONID')}`
        }
      })
      .then((res) => console.log(res));
  };
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
