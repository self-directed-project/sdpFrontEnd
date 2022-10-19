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
      <h5>자주 찾는 회의실</h5>
      <button type="button" onClick={onClick}>
        Clicked
      </button>
    </div>
  );
}
export default MainPage;
