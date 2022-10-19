import axios from 'axios';
import { Cookies } from 'react-cookie';
import MeetingroomList from '../components/MeetingroomList';

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
    <div>
      <MeetingroomList />
    </div>
  );
}
export default MainPage;
