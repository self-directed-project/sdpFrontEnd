import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ViewMeeting = styled.div`
  position: absolute;
  left: 330px;
  bottom: 710px;
  width: 88%;
  background: #ffffff;
  border-radius: 12px;
  background-color: white;
  padding: 20px;
`;
const ViewMeetingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  & h3 {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 23px;
    line-height: 23px;
  }
  & button {
    color: #6c6c6c;
    background-color: white;
    padding: 10px 33px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
const ListTable = styled.table`
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
  font-size: 20px;

  & th {
    padding: 20px;
  }
  & td {
    padding: 20px;
  }
`;

const ViewMeetingListTr = styled.tr`
  background-color: #f9f9fb;
  border-collapse: collapse;
  border-radius: 10px;

  & td {
    color: rgba(0, 0, 0, 0.5);
  }
  & td:nth-child(1) {
    width: 30px;
  }
`;
const MeetingTime = styled.td`
  color: #0594ff;
  font-weight: bolder;
`;
const ColorChangeBody = styled.tbody`
  & tr:hover {
    background-color: aliceblue;
    font-weight: 900;
  }
`;

const MeetingRoomColorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MeetingRoomColor = styled.div`
  width: 10px;
  height: 10px;
  background-color: #17c2e0;
  margin-right: 15px;
`;

const DeleteIcon = styled(DeleteForeverIcon)``;

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyMeetingList() {
  const [listArr, setListArr] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [curCheck, setCurCheck] = useState(false);
  const [checkedArr, setCheckedArr] = useState([]);

  const changeAllCheck = (e) => {
    if (e.target.checked) {
      const allArr = listArr.map((item) => item.name);
      setCheckedArr(allArr);
      setIsCheckAll(true);
    } else {
      setCheckedArr([]);
      setIsCheckAll(false);
    }
  };

  const checkingCheckedBox = (name, e) => {
    if (e.target.checked === false) {
      const newArr = checkedArr.filter((item) => item !== name);
      setCheckedArr(newArr);
    } else {
      setCheckedArr((prev) => [...prev, name]);
    }
    if (checkedArr.length === listArr.length) {
      setCurCheck(false);
    }
    console.log(name);
  };
  const deleteList = () => {
    axios
      .post('http://localhost:7070/data', {
        data: checkedArr
      })
      .then((res) => {
        console.log(res.data);
      });
    setIsCheckAll(false);
    setCheckedArr([]);
  };

  useEffect(() => {
    axios.get('http://localhost:6060/data').then((res) => {
      setListArr(res.data.meetingrooms);
    });
  }, []);
  return (
    <ViewMeeting>
      <ViewMeetingHeader>
        <h3>전체 일정</h3>
        <button type="button" onClick={deleteList}>
          <DeleteDiv>
            <DeleteIcon />
            <span>삭제</span>
          </DeleteDiv>
        </button>
      </ViewMeetingHeader>
      <ListTable>
        <thead>
          <ViewMeetingListTr>
            <td>
              {isCheckAll ? (
                <input type="checkbox" onClick={changeAllCheck} checked />
              ) : (
                <input type="checkbox" onClick={changeAllCheck} />
              )}
            </td>
            <td>회의명</td>
            <td>회의 일시</td>
            <td>회의 시간</td>
            <td>회의실</td>
            <td>개설자</td>
          </ViewMeetingListTr>
        </thead>
        <ColorChangeBody>
          {listArr.map((item) => (
            <tr>
              <td>
                {isCheckAll ? (
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      checkingCheckedBox(item.name, e);
                    }}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      checkingCheckedBox(item.name, e);
                    }}
                  />
                )}
              </td>
              <td>
                <MeetingRoomColorDiv>
                  <MeetingRoomColor />
                  <span>{item.meetingName}</span>
                </MeetingRoomColorDiv>
              </td>
              <td>{item.date}</td>
              <MeetingTime>{item.meetingTime}</MeetingTime>
              <td>{item.name}</td>
              <td>{item.Founder}</td>
            </tr>
          ))}
        </ColorChangeBody>
      </ListTable>
    </ViewMeeting>
  );
}
export default MyMeetingList;
