import styled from 'styled-components';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete/AutoComplete';

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
  width: 600px;
  height: 961px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  padding-top: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
`;

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
const Close = styled(CloseRoundedIcon)`
  &:hover {
    cursor: pointer;
  }
`;
const Form = styled.form`
  margin-left: 17px;
  margin-right: 27px;
`;
const UpdateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Select = styled.select`
  border: 0;
  border-bottom: 1px solid #d7e3f1;
  width: 475px;
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
  width: 110px;
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
  width: 458px;
  height: 60px;
  outline: 0;
  font-size: 18px;
  font-weight: 500;
  &:focus {
    border-bottom: 2px solid #0594ff;
  }
  &::before {
    content: attr(data-placeholder);
    width: 100%;
  }
  &:focus::before,
  :valid::before {
    display: none;
  }
`;
const TextArea = styled.textarea`
  margin-top: 25px;
  width: 544px;
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
  width: 545px;
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
  float: left;
`;
const StartTextDiv = styled(TextDiv)`
  margin-bottom: 20px;
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

// eslint-disable-next-line react/prop-types
function UpdateModal({ setUpdateModalOpen, meetingId }) {
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setUpdateModalOpen(false);
    }
  };
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

  const [list, setList] = useState([]);
  const [meetingEarlyVal, setMeetingEarlyVal] = useState([]);
  const [membersEarlyVal, setMembersEarlyVal] = useState([]);
  const [gType, setgType] = useState([]);
  const [attendeesId, setAttendeesId] = useState([]);
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

  inputList.inputMeetingName = `${meetingEarlyVal.name}`;
  inputList.inputDate = `${meetingEarlyVal.startDate}`;
  inputList.inputMeetingRoomId = `${meetingEarlyVal.meetingRoom}`;
  inputList.inputType = `${meetingEarlyVal.meetingType}`;
  inputList.inputStartHour = `${meetingEarlyVal.startHour}`;
  inputList.inputStartMin = `${meetingEarlyVal.startMinute}`;
  inputList.inputEndHour = `${meetingEarlyVal.endHour}`;
  inputList.inputEndMin = `${meetingEarlyVal.endMinute}`;
  const getList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/meeting/reserve');
      setList(res.data.meetingRoomList);
      setgType(res.data.meetingType);
    } catch (error) {
      console.log(error);
    }
  };
  const getEarlyVal = async () => {
    const params = {
      meetingId: `${meetingId}`
    };
    try {
      const res = await axios.get('http://localhost:8080/meeting/update', {
        params
      });
      setMeetingEarlyVal(res.data.meeting);
      setMembersEarlyVal(res.data.members);
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
  const PostList = async () => {
    const start = `${inputList.inputDate}T${inputList.inputStartHour}:${inputList.inputStartMin}`;
    const end = `${inputList.inputDate}T${inputList.inputEndHour}:${inputList.inputEndMin}`;
    try {
      axios.post('http://localhost:8080/meeting/update', {
        id: Number(`${meetingId}`),
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
  const onCloseModalcon = (e) => {
    setUpdateModalOpen(false);
  };
  useEffect(() => {
    getList();
    getEarlyVal();
  }, []);

  return (
    <MainDiv onClick={onCloseModal}>
      <Div>
        <Header>
          <MainTitle>{inputList.inputMeetingName}</MainTitle>
          <Close onClick={onCloseModalcon} />
        </Header>
        <Form>
          <TextDiv>참석자</TextDiv>
          <AutoComplete getAttendees={getAttendees} width="545px" />
          <UpdateDiv>
            <TextLabel htmlFor="meetingRoomList">회의실</TextLabel>
            <Select
              id="meetingRoom"
              onChange={(event) => {
                inputList.inputMeetingRoomId = event.target.value;
              }}
            >
              <option value="" disabled selected>
                {inputList.inputMeetingRoomId} 회의실
              </option>
              {list.map((li) => (
                <option
                  value={li.id}
                  defaultValue={list.defaultValue === li.value}
                >
                  {li.name}
                </option>
              ))}
            </Select>
          </UpdateDiv>
          <UpdateDiv>
            <TextLabel htmlFor="meetingRoomType">회의 유형</TextLabel>
            <Select
              id="meetingType"
              onChange={(event) => {
                inputList.inputType = event.target.value;
              }}
            >
              <option value="" disabled selected>
                {meetingEarlyVal.meetingType}
              </option>
              {gType.map((typ) => (
                <option value={typ}>{typ}</option>
              ))}
            </Select>
          </UpdateDiv>
          <UpdateDiv>
            <TextSpan>회의 날짜</TextSpan>
            <TimeInput
              type="date"
              data-placeholder={inputList.inputDate}
              onChange={(event) => {
                inputList.inputDate = event.target.value;
              }}
            />
          </UpdateDiv>
          <UpdateDiv>
            <TextDiv htmlFor="meetingStart">회의 시작</TextDiv>
          </UpdateDiv>
          <UpdateDiv>
            <TimeSelect
              id="hour"
              onChange={(event) => {
                inputList.inputStartHour = event.target.value;
              }}
            >
              <option value="" disabled selected>
                {inputList.inputStartHour}
              </option>
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
              <option value="" disabled selected>
                {inputList.inputStartMin}
              </option>
              {minuteArr.map((min) => (
                <option value={min}>{min}</option>
              ))}
            </TimeSelect>
            <TimeSelect
              id="hour"
              onChange={(event) => {
                inputList.inputEndHour = event.target.value;
              }}
            >
              <option value="" disabled selected>
                {inputList.inputEndHour}
              </option>
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
              <option value="" disabled selected>
                {inputList.inputEndMin}
              </option>
              {minuteArr.map((min) => (
                <option value={min}>{min}</option>
              ))}
            </TimeSelect>
          </UpdateDiv>
          <TextDiv>회의 내용</TextDiv>
          <TextArea
            placeholder={meetingEarlyVal.description}
            onChange={(event) => {
              inputList.inputDescription = event.target.value;
            }}
          />
          <Btn type="submit" value="예약수정" onClick={PostList} />
        </Form>
      </Div>
    </MainDiv>
  );
}
export default UpdateModal;
