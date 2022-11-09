import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import { Cookies } from 'react-cookie';
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
  padding-left: 35px;
  padding-top: 43px;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 26px;
  line-height: 32.55px;
`;

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
          <div>
            <MyMeetingList />
            <EntireMeeting />
          </div>
        </MeetingDiv>
      </Div>
    </Fragment>
  );
}
export default ViewMeetPage;
