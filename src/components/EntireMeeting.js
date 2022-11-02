import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ViewMeeting = styled.div`
  position: absolute;
  left: 330px;
  bottom: 500px;
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
  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const allArr = listArr.map((item) => item.name);
      setCheckItems(allArr);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
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
        <button type="button">
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
              <input
                type="checkbox"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === listArr.length}
              />
            </td>
            <td>회의명</td>
            <td>회의 일시</td>
            <td>회의 시간</td>
            <td>회의실</td>
            <td>개설자</td>
          </ViewMeetingListTr>
        </thead>
        <ColorChangeBody>
          {console.log(checkItems)}
          {listArr?.map((item, key) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                  checked={!!checkItems.includes(item.id)}
                />
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
