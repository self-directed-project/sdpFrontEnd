import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import MeetingroomList from '../components/MeetingroomList';

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
    <div>
      <MeetingroomList />
    </div>
  );
}
export default MainPage;
