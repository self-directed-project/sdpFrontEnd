/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateModal from './UpdateModal';

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Div = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  padding: 25px;
  padding-top: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`;
const UpdateBtn = styled.button`
  border-radius: 10%;
  border: none;
  padding: 5px 10px;
`;
const HeaderRightDiv = styled.div`
  display: flex;
`;
const HeaderDivName = styled.div`
  background-color: #cef2f9;
  color: #17c2e0;
  padding: 7px 14px 7px 14px;
  border-radius: 7px;
  font-weight: 700;
`;
const BodyStartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 35px;

  & div:first-child {
    font-weight: 700;
    font-size: 28px;
    line-height: 60px;
  }
`;
const BodyDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 110px;
  margin-bottom: 25px;
`;

const DeleteIcon = styled(ClearIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const BodyDataInfo = styled.div`
  margin: auto;
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyDataInfoDiv = styled.div`
  background-color: #f9fdff;
  border-radius: 6px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 45%;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const MeetingContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & form {
    width: 100%;
  }
`;

const MeetingContentUl = styled.ul`
  color: #c2c2c2;
  padding-left: 0px;
  width: 100%;

  & div {
    text-align: left;
    margin-bottom: 10px;
    height: 100px;
    width: 100%;
    overflow: scroll;
    border: none;
  }
  & div::-webkit-scrollbar {
    display: none;
  }
`;

const cookie = new Cookies();

// eslint-disable-next-line react/prop-types
function ViewDetails({
  setDetailModalOpen,
  meetingId,
  meetingName,
  meetingStart,
  meetingEnd,
  attendList,
  setUpdateModalOpenInDetail
}) {
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setDetailModalOpen(false);
    }
  };
  const onCloseModalcon = (e) => {
    if (e.target === e.currentTarget) {
      setDetailModalOpen(false);
    }
  };
  const date = new Date(
    `20${meetingStart.substring(0, 2)}-${Number(
      meetingStart.substring(3, 5)
    )}-${meetingStart.substring(6, 8)} ${meetingStart.substring(
      9,
      11
    )}:${meetingStart.substring(12, 14)}`
  );
  console.log(date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date.getDay()];

  const UpdateModalHandler = () => {
    setUpdateModalOpenInDetail(true);
    setDetailModalOpen(false);
  };

  return (
    // 모달창을 useRef로 잡아준다.
    <MainDiv onClick={onCloseModal}>
      <Div>
        <HeaderDiv>
          <HeaderDivName>{`${meetingId}회의실`}</HeaderDivName>
          <HeaderRightDiv>
            <UpdateBtn type="button" onClick={UpdateModalHandler}>
              수정하기
            </UpdateBtn>
            <DeleteIcon onClick={onCloseModalcon} />
          </HeaderRightDiv>
        </HeaderDiv>
        <BodyStartDiv>
          <div>{meetingName}</div>
          <div>{`${meetingStart.substring(
            0,
            8
          )} ${dayOfWeek} ${meetingStart.substring(8)} ~ ${meetingEnd.substring(
            8
          )}`}</div>
        </BodyStartDiv>
        <BodyDataDiv>
          <div>참석자</div>
          <BodyDataInfo>
            {attendList.map((list, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <BodyDataInfoDiv key={index}>{list}</BodyDataInfoDiv>
            ))}
          </BodyDataInfo>
        </BodyDataDiv>
        <MeetingContentDiv>
          <div>회의 내용</div>
          <form>
            <MeetingContentUl>
              <div>회의내용</div>
            </MeetingContentUl>
          </form>
        </MeetingContentDiv>
      </Div>
    </MainDiv>
  );
}
export default ViewDetails;
