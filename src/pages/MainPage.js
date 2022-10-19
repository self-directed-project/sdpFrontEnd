import MeetingroomList from '../components/MeetingroomList';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

function MainPage() {
  const onClick = () => {
    axios
      .get('http://localhost:8080/main', {
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
