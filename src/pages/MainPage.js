import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import MeetingroomList from '../components/MeetingroomList';

const cookie = new Cookies();

export const sendingSession = () => {
  axios
    .get('https://sdp-ourmeeting.herokuapp.com/main', {
      headers: {
        Authorization: `Bearer ${cookie.get('JSESSIONID')}`
      }
    })
    .then((res) => console.log(res));
};

function MainPage() {
  useEffect(() => {
    sendingSession();
  }, []);
  return (
    <div>
      <MeetingroomList />
    </div>
  );
}
export default MainPage;
