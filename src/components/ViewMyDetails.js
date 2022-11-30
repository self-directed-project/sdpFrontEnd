/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { React } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

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
  width: 100%;

  & form {
    width: 100%;
  }
`;

const MeetingContentUl = styled.ul`
  color: #c2c2c2;
  padding-left: 0px;

  & div {
    text-align: left;
    margin-bottom: 10px;
    height: 100px;
    width: 100%;
    overflow: scroll;
  }
  & div::-webkit-scrollbar {
    display: none;
  }
`;
const ColorDiv = styled.div`
  color: #888888;
`;
const DateInput = styled.input`
  &::before {
    content: attr(data-placeholder);
    width: 100%;
  }

  &:focus::before {
    display: none;
  }
  &:valid::before {
    display: none;
  }
`;

const cookie = new Cookies();

// eslint-disable-next-line react/prop-types
function ViewMyDetails({
  setMyDetailModalOpen,
  MymeetingId,
  MymeetingName,
  MymeetingStart,
  MymeetingEnd,
  MyattendList,
  setUpdateModalOpenInDetail
}) {
  console.log(MymeetingId, MymeetingStart, MymeetingEnd);
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setMyDetailModalOpen(false);
    }
  };
  const onCloseModalcon = (e) => {
    setMyDetailModalOpen(false);
  };
  const date = new Date(
    `20${MymeetingStart.substring(0, 2)}-${Number(
      MymeetingStart.substring(3, 5)
    )}-${MymeetingStart.substring(6, 8)} ${MymeetingStart.substring(
      9,
      11
    )}:${MymeetingStart.substring(12, 14)}`
  );
  console.log(date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date.getDay()];

  const UpdateModalHandler = () => {
    setMyDetailModalOpen(false);
    setUpdateModalOpenInDetail(true);
  };

  return (
    // 모달창을 useRef로 잡아준다.
    <MainDiv onClick={onCloseModal}>
      <Div>
        <HeaderDiv>
          <HeaderDivName>{`${MymeetingId}회의실`}</HeaderDivName>
          <div>
            <button type="button">수정하기</button>
            <DeleteIcon onClick={onCloseModalcon} />
          </div>
        </HeaderDiv>
        <BodyStartDiv>
          <div>{MymeetingName}</div>
          <div>{`${MymeetingStart.substring(
            0,
            8
          )} ${dayOfWeek} ${MymeetingStart.substring(
            8
          )} ~ ${MymeetingEnd.substring(8)}`}</div>
        </BodyStartDiv>
        <BodyDataDiv>
          <ColorDiv>참석자</ColorDiv>
          <BodyDataInfo>
            {MyattendList.map((list, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <BodyDataInfoDiv key={index}>{list}</BodyDataInfoDiv>
            ))}
          </BodyDataInfo>
        </BodyDataDiv>
        <MeetingContentDiv>
          <ColorDiv>회의 내용</ColorDiv>
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
export default ViewMyDetails;
