import axios from 'axios';
import { useEffect, useState } from 'react';

function MeetingroomList() {
  const [meetingrooms, setMeetingrooms] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const onFavorites = (event) => {
    const eventId = Number(event.target.id);
    // const meetingroomsId = meetingrooms[eventId - 1].id;
    setFavorite(...meetingrooms[eventId - 1].name);
    console.log(favorite);
    // console.log(meetingrooms[eventId - 1].name);
  };

  const getMeetingroom = async () => {
    try {
      const json = await axios.get('http://localhost:8000/data');
      setMeetingrooms(json.data.meetingrooms);
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
      {meetingrooms.map((meetingroom) => (
        <div key={meetingroom.id}>
          <button type="button" onClick={onFavorites} id={meetingroom.id}>
            ❤
          </button>
          <span>{meetingroom.name}</span>
        </div>
      ))}
    </div>
  );
}
export default MeetingroomList;
