import axios from 'axios';
import { useEffect, useState } from 'react';

function MeetingroomList() {
  const [fav, setFav] = useState([]);
  const [nonFav, setNonFav] = useState([]);
  const params = {
    memberId: 1,
    meetingRoomId: 1
  };
  const getMeetingroom = async () => {
    try {
      const res = await axios.get(
        'https://sdp-ourmeeting.herokuapp.com/meeting-rooms',
        {
          params
        }
      );
      setFav(res.data.fav);
      setNonFav(res.data.nonFav);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const postMeetingroom = async (memberId, meetingRoomId) => {
    try {
      axios
        .post('https://sdp-ourmeeting.herokuapp.com/meeting-rooms', {
          memberId: `${memberId}`,
          meetingRoomId: `${meetingRoomId}`
        })
        .then((res) => {
          getMeetingroom();
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtn = (event) => {
    const meetingRoomId = event.target.id;
    postMeetingroom(params.memberId, meetingRoomId);
  };

  useEffect(() => {
    getMeetingroom();
  }, []);
  return (
    <div>
      <h5>자주 찾는 회의실</h5>
      {fav.map((meetingroom) => (
        <div key={meetingroom.id}>
          <button type="button" id={meetingroom.id} onClick={handleBtn}>
            ❤
          </button>
          <span>{meetingroom.name}</span>
        </div>
      ))}
      {fav.length === 0 || nonFav.length === 0 ? <hr /> : null}
      {nonFav.map((meetingroom) => (
        <div key={meetingroom.id}>
          <button type="button" id={meetingroom.id} onClick={handleBtn}>
            ❤
          </button>
          <span>{meetingroom.name}</span>
        </div>
      ))}
    </div>
  );
}
export default MeetingroomList;
