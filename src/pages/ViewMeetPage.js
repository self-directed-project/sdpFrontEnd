import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyMeetingList from '../components/MyMeetingList';
import MeetingroomList from '../components/MeetingroomList';
import EntireMeeting from '../components/EntireMeeting';
import MyMeetingHeader from '../components/MyMeetingHeader';

const Div = styled.div`
  display: flex;
  margin: 0;
  background-color: #f1f5f8;
  width: 100vw;
  height: 100vh;
`;
const MeetingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;
const MeetingHeaderDiv = styled.div`
  width: 100%;
  height: 20%;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 26px;
  line-height: 32.55px;
`;
const MeetingListDiv = styled.div`
  width: 100%;
  height: 80%;
  font-family: 'Spoqa Han Sans Neo';
`;

const cookie = new Cookies();
export const sendingSession = () => {
  if (sessionStorage.getItem('user_id') === null) {
    navigator('/');
  } else {
    axios
      .get('http://localhost:8080/main', {
        headers: {
          Authorization: `Bearer ${cookie.get('JSESSIONID')}`
        },
        withCredentials: true
      })
      .then((res) => console.log(res));
  }
};
function ViewMeetPage() {
  return (
    <Fragment key="key">
      <Div>
        <div>
          <MeetingroomList />
        </div>
        <MeetingDiv>
          <MeetingHeaderDiv>
            <MyMeetingHeader />
          </MeetingHeaderDiv>
          <MeetingListDiv>
            <MyMeetingList />
            <EntireMeeting />
          </MeetingListDiv>
        </MeetingDiv>
      </Div>
    </Fragment>
  );
}
export default ViewMeetPage;
