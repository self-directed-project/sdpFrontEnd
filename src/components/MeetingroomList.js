import axios from 'axios';
import styled from 'styled-components';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OurMeetingIcon from './OurMeetingIcon';

function MeetingroomList() {
  const [fav, setFav] = useState([]);
  const [nonFav, setNonFav] = useState([]);
  const params = {
    memberId: 1,
    meetingRoomId: 1
  };
  const navigate = useNavigate();
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
          setFav(res.data.fav);
          setNonFav(res.data.nonFav);
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
    <List>
      <MainTitle>
        <OurMeetingIcon />
        <h2>OUR MEETING</h2>
      </MainTitle>
      <ViewMeetingBtn type="button" onClick={() => navigate('/mymeeting')}>
        내 회의 보기
      </ViewMeetingBtn>
      <Title>자주 찾는 회의실</Title>
      {fav.map((meetingroom) => (
        <Element key={meetingroom.id}>
          <ElementChild1>
            <FavBtn type="button" id={meetingroom.id} onClick={handleBtn}>
              StarIcon
            </FavBtn>
            <span>{meetingroom.name}</span>
          </ElementChild1>
          <ElementChild2>
            <Dot />
          </ElementChild2>
        </Element>
      ))}
      {fav.length === 0 || nonFav.length === 0 ? null : <Hr />}
      {nonFav.map((meetingroom) => (
        <Element key={meetingroom.id}>
          <ElementChild1>
            <NonFavBtn type="button" id={meetingroom.id} onClick={handleBtn}>
              StarIcon
            </NonFavBtn>
            <span>{meetingroom.name}</span>
          </ElementChild1>
          <ElementChild2>
            <Dot />
          </ElementChild2>
        </Element>
      ))}
    </List>
  );
}
const List = styled.div`
  width: 250px;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
`;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px 30px 23px;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 800;
`;
const ViewMeetingBtn = styled.button`
  margin-left: 20px;
  margin-right: 20px;
  padding: 15px 60px;
  border-radius: 10px;
  border: solid 1.9px #0594ff;
  color: #0594ff;
  background-color: white;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  &:hover {
    background-color: #f9fdff;
    & > span {
      color: #0594ff;
    }
  }
`;
const Title = styled.h5`
  margin-top: 54px;
  margin-bottom: 24px;
  margin-left: 28px;
  color: #666666;
  font-size: 14px;
  font-weight: 500;
`;
const Hr = styled.hr`
  border: 1px solid #dee2ec;
  margin: 8px 14px 8px 14px;
`;

const Element = styled.div`
  display: flex;
  width: 250px;
  height: 50px;
  align-items: center;
  color: #333333;
  font-weight: 400;
  justify-content: space-between;
  &:hover {
    border-left: solid 3px #0594ff;
    background-color: #f9fdff;
    & > span {
      color: #0594ff;
    }
  }
`;

const ElementChild1 = styled.div`
  display: flex;
  align-items: center;
`;

const ElementChild2 = styled.div`
  margin-right: 14px;
  color: #a4b9d2;
  font-size: xx-small;
`;
const FavBtn = styled(StarRoundedIcon)`
  color: #0594ff;
  margin-left: 28px;
  margin-right: 11px;
`;

const NonFavBtn = styled(StarOutlineRoundedIcon)`
  color: #dee2ec;
  margin-left: 28px;
  margin-right: 11px;
  font-size: 16px;
`;

const Dot = styled(MoreHorizSharpIcon)`
  font-size: xx-small;
`;

export default MeetingroomList;
