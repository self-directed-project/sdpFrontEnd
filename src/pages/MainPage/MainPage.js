import axios from 'axios';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import MyMeetingList from './MyMeetingList';
import MeetingroomList from '../../components/MeetingroomList';
import EntireMeeting from './EntireMeeting';
import MeetingList from './MeetingList';

const Div = styled.div`
  margin: 0;
  background-color: #f1f5f8;
  width: 100vw;
  height: 100vh;
`;

function MainPage() {
  return (
    <Fragment key="key">
      <Div>
        <MeetingroomList />
        <MyMeetingList />
      </Div>
    </Fragment>
  );
}
export default MainPage;
