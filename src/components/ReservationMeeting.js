import styled from 'styled-components';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from 'react';

function ReservationMeeting() {
  const hourArr = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ];
  const minuteArr = ['00', '30'];
  const [list, setList] = useState([]);
  const [type, setType] = useState([]);
  const getList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/meeting/reserve');
      setList(res.data.meetingRoomList);
      setType(res.data.meetingType);
      console.log(res.data);
      console.log(res.data.meetingType[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <EntireDiv>
      <Header>
        <MainTitle>예약 하기</MainTitle>
        <Close />
      </Header>
      <Form>
        <Div>
          <TextSpan>회의명</TextSpan>
          <Input type="text" />
        </Div>
        <TextDiv>참석자</TextDiv>
        <AttendeesInput type="text" />
        <AttendeesList />
        <Div>
          <TextLabel htmlFor="meetingRoomList">회의실</TextLabel>
          <Input list="meetingRoom" name="meetingRoomList" />
          <datalist id="meetingRoom">
            {list.map((li) => (
              <option value={li.name} key={li.id} id={li.id} />
            ))}
          </datalist>
        </Div>
        <Div>
          <TextLabel htmlFor="meetingRoomType">회의 유형</TextLabel>
          <Input list="meetingType" name="meetingRoomType" />
          <datalist id="meetingType">
            {type.map((typ) => (
              <option value={typ} />
            ))}
          </datalist>
        </Div>
        <Div>
          <TextSpan>회의 날짜</TextSpan>
          <Input type="date" />
        </Div>
        <Div>
          <TextLabel htmlFor="meetingStart">회의 시작</TextLabel>
          <TimeInput list="hour" name="meetingStart" />
          <datalist id="hour">
            {hourArr.map((hour) => (
              <option value={hour} />
            ))}
          </datalist>
          <span> : </span>
          <TimeInput list="minute" name="meetingStart" />
          <datalist id="minute">
            {minuteArr.map((min) => (
              <option value={min} />
            ))}
          </datalist>
        </Div>
        <Div>
          <TextLabel htmlFor="meetingFinish">회의 종료</TextLabel>
          <TimeInput list="hour" name="meetingFinish" />
          <datalist id="hour">
            {hourArr.map((hour) => (
              <option value={hour} />
            ))}
          </datalist>
          <span> : </span>
          <TimeInput list="minute" name="meetingFinish" />
          <datalist id="minute">
            {minuteArr.map((min) => (
              <option value={min} />
            ))}
          </datalist>
        </Div>
        <TextDiv>회의 내용</TextDiv>
        <TextArea placeholder="회의 내용을 적어주세요" />
        <Btn type="button" value="예약하기" />
      </Form>
    </EntireDiv>
  );
}

const EntireDiv = styled.div`
  width: 415px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 25px 20px 17px;
`;
const MainTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const Close = styled(CloseRoundedIcon)``;
const Form = styled.form`
  margin-left: 17px;
  margin-right: 27px;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #d7e3f1;
  width: 291px;
  height: 60px;
  outline: 0;
  font-size: 18px;
  font-weight: 500;
  &:focus {
    border-bottom: 2px solid #0594ff;
  }
`;

const AttendeesInput = styled.input`
  border: 0;
  border-bottom: 1px solid #d7e3f1;
  width: 377px;
  height: 60px;
  outline: 0;
  font-size: 18px;
  font-weight: 500;
  &:focus {
    border-bottom: 2px solid #0594ff;
  }
`;
const AttendeesList = styled.div`
  height: 120px;
`;
const TimeInput = styled.input`
  border: 0;
  border-bottom: 1px solid #d7e3f1;
  height: 60px;
  width: 128.35px;
  font-size: 18px;
  font-weight: 500;
  outline: 0;
  &:focus {
    border-bottom: 2px solid #0594ff;
  }
`;
const TextArea = styled.textarea`
  margin-top: 25px;
  width: 377px;
  height: 86px;
  border: 1px solid #d7e3f1;
  border-radius: 6px;
  resize: none;
  font-weight: 500;
  font-size: 14px;
  padding: 15px;
  outline: 0;
  ::placeholder {
    color: #d7e3f1;
  }
  &:focus {
    border: 2px solid #0594ff;
  }
`;

const Btn = styled.input`
  width: 378px;
  height: 60px;
  background: #0594ff;
  border-radius: 10px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  border: none;
  margin-top: 30px;
`;
const TextDiv = styled.div`
  color: #888888;
  margin-top: 13px;
  font-size: 14px;
  font-weight: 500;
`;
const TextSpan = styled.span`
  color: #888888;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 500;
`;
const TextLabel = styled.label`
  color: #888888;
  margin-top: 21px;
  margin-bottom: 21px;
  font-size: 14px;
  font-weight: 500;
`;

export default ReservationMeeting;
