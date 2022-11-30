import styled from 'styled-components';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete/AutoComplete';

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
  const inputList = {
    inputMeetingName: '',
    inputMemberId: [],
    inputDate: '',
    inputMeetingRoomId: 0,
    inputType: '',
    inputStartHour: '',
    inputStartMin: '',
    inputEndHour: '',
    inputEndMin: '',
    inputDescription: ''
  };

  const [list, setList] = useState([]);
  const [gType, setgType] = useState([]);
  const [attendeesId, setAttendeesId] = useState([]);
  const getList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/meeting/reserve');
      setList(res.data.meetingRoomList);
      setgType(res.data.meetingType);
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendees = (card) => {
    setAttendeesId(card);
    attendeesId.map((item) => inputList.inputMemberId.push(Number(item.id)));
    const uniq = (arr) => [[...new Set(arr)]];
    const uniqArr = uniq(inputList.inputMemberId)[0];
    inputList.inputMemberId = uniqArr;
  };
  const postList = async (event) => {
    const start = `${inputList.inputDate}T${inputList.inputStartHour}:${inputList.inputStartMin}`;
    const end = `${inputList.inputDate}T${inputList.inputEndHour}:${inputList.inputEndMin}`;
    try {
      axios.post('http://localhost:8080/meeting/reserve', {
        name: inputList.inputMeetingName,
        membersId: inputList.inputMemberId,
        meetingRoomId: Number(`${inputList.inputMeetingRoomId}`),
        type: `${inputList.inputType}`,
        start: `${start}`,
        end: `${end}`,
        description: `${inputList.inputDescription}`
      });
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
        <MainTitle>예약하기</MainTitle>
        <Close />
      </Header>
      <Form>
        <Div>
          <TextLabel>회의명</TextLabel>
          <Input
            type="text"
            onChange={(event) => {
              inputList.inputMeetingName = event.target.value;
            }}
          />
        </Div>
        <TextDiv>참석자</TextDiv>
        <AutoComplete getAttendees={getAttendees} width="390px" />
        <Div>
          <TextLabel htmlFor="meetingRoomList">회의실</TextLabel>
          <Select
            id="meetingRoom"
            onChange={(event) => {
              inputList.inputMeetingRoomId = event.target.value;
            }}
          >
            <option value="none" hidden />
            {list.map((li) => (
              <option
                value={li.id}
                defaultValue={list.defaultValue === li.value}
              >
                {li.name}
              </option>
            ))}
          </Select>
        </Div>
        <Div>
          <TextLabel htmlFor="meetingRoomType">회의 유형</TextLabel>
          <Select
            id="meetingType"
            onChange={(event) => {
              inputList.inputType = event.target.value;
            }}
          >
            <option value="none" hidden />
            {gType.map((typ) => (
              <option value={typ}>{typ}</option>
            ))}
          </Select>
        </Div>
        <Div>
          <TextSpan>회의 날짜</TextSpan>
          <TimeInput
            type="date"
            onChange={(event) => {
              inputList.inputDate = event.target.value;
            }}
          />
        </Div>
        <Div>
          <TextLabel htmlFor="meetingStart">회의 시작</TextLabel>
          <TimeSelect
            id="hour"
            onChange={(event) => {
              inputList.inputStartHour = event.target.value;
            }}
          >
            <option value="none" hidden />
            {hourArr.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </TimeSelect>
          <span> : </span>
          <TimeSelect
            id="minute"
            onChange={(event) => {
              inputList.inputStartMin = event.target.value;
            }}
          >
            <option value="none" hidden />
            {minuteArr.map((min) => (
              <option value={min}>{min}</option>
            ))}
          </TimeSelect>
        </Div>
        <Div>
          <TextLabel htmlFor="meetingFinish">회의 종료</TextLabel>
          <TimeSelect
            id="hour"
            onChange={(event) => {
              inputList.inputEndHour = event.target.value;
            }}
          >
            <option value="none" hidden />
            {hourArr.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </TimeSelect>
          <span> : </span>
          <TimeSelect
            id="minute"
            onChange={(event) => {
              inputList.inputEndMin = event.target.value;
            }}
          >
            <option value="none" hidden />
            {minuteArr.map((min) => (
              <option value={min}>{min}</option>
            ))}
          </TimeSelect>
        </Div>
        <TextDiv>회의 내용</TextDiv>
        <TextArea
          placeholder="회의 내용을 적어주세요"
          onChange={(event) => {
            inputList.inputDescription = event.target.value;
          }}
        />
        <Btn type="submit" value="예약하기" onClick={postList} />
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
const Select = styled.select`
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

const TimeSelect = styled.select`
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
const TimeInput = styled.input`
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
