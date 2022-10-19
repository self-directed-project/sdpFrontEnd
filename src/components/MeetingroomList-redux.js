import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getFavList } from '../store/getFav';
// import { getNonFavList } from '../store/getNonFav';
import { getList } from '../store/getList';

function MeetingroomList() {
  const dispatch = useDispatch();
  // const favList = useSelector((state) => state.favListReducer);
  // const nonFavList = useSelector((state) => state.nonFavListReducer);
  const list = useSelector((state) => state.listReducer); // 임시
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
  };

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
  }; */

  useEffect(() => {
    // dispatch(getFavList());
    // dispatch(getNonFavList());
    dispatch(getList());
    console.log(list);
    console.log(list);
  }, [dispatch]);
  return (
    <div>
      <h5>자주 찾는 회의실</h5>
    </div>
  );
}
export default MeetingroomList;
