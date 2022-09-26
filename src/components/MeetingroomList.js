import axios from 'axios';
import { useEffect, useState } from 'react';

function MeetingroomList() {
  const [meetingrooms, setMeetingrooms] = useState([]);
  const [notFav, setNotFav] = useState([]);
  const [fav, setFav] = useState([]);
  // const [toggle, setToggle] = useState(true);

  /* const onFavorites = (event) => {
    const eventId = Number(event.target.id);
    if (meetingrooms[eventId - 1].isFav === true) {
      setFavorite([...favorite, meetingrooms[eventId - 1].name]);
      console.log(favorite);
      setToggle(!toggle);
    } else {
      favorite.filter((fav) => fav.id !== eventId);
      console.log(favorite);
      setToggle(!toggle);
    }
  }; */

  const isFavorite = () => {
    const favArr = [];
    const notFavArr = [];
    for (let i = 0; i < meetingrooms.length; i++) {
      if (meetingrooms[i].isFav === false) {
        favArr.push(meetingrooms[i]);
      } else {
        notFavArr.push(meetingrooms[i]);
      }
    }
    setFav(favArr);
    setNotFav(notFavArr);
  };

  const getMeetingroom = async () => {
    try {
      const json = await axios.get('http://localhost:8000/data');
      setMeetingrooms(json.data.meetingrooms);
      isFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeetingroom();
  }, []);
  return (
    <div>
      <h5>자주 찾는 회의실</h5>
      {fav.map((meetingroom) => (
        <div key={meetingroom.id}>
          <button type="button" id={meetingroom.id}>
            ❤
          </button>
          <span>{meetingroom.name}</span>
        </div>
      ))}
      {fav.length > 0 ? <hr /> : null}
      {notFav.map((meetingroom) => (
        <div key={meetingroom.id}>
          <button type="button" id={meetingroom.id}>
            ❤
          </button>
          <span>{meetingroom.name}</span>
        </div>
      ))}
    </div>
  );
}
export default MeetingroomList;
