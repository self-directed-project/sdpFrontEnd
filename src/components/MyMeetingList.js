/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ViewMyDetails from './ViewMyDetails';
import UpdateModal from './UpdateModal';

const cookie = new Cookies();

// eslint-disable-next-line react/prop-types
function MyMeetingList({ setMyDetailModalOpen, MydetailModalOpen }) {
  const [listArr, setListArr] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedArr, setCheckedArr] = useState([]);
  const [MymeetingID, setMyMeetingID] = useState('');
  const [MymeetingName, setMyMeetingName] = useState('');
  const [MymeetingStart, setMyMeetingStart] = useState('');
  const [MymeetingEnd, setMyMeetingEnd] = useState('');
  const [MyattendList, setMyAttendList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const changeAllCheck = (e) => {
    console.log(listArr);
    if (isCheckAll === false) {
      const allArr = listArr.map((item) => item.meetingId);
      setCheckedArr(allArr);
      setIsCheckAll(true);
      for (let i = 0; i < listArr.length; i++) {
        listArr[i].checked = true;
      }
      console.log(listArr);
    } else {
      setCheckedArr([]);
      setIsCheckAll(false);
      for (let i = 0; i < listArr.length; i++) {
        listArr[i].checked = false;
      }
    }
  };

  const checkingCheckedBox = (meetingId, e) => {
    if (e.target.checked === false) {
      const newArr = checkedArr.filter((item) => item !== meetingId);
      setCheckedArr(newArr);
    } else {
      setCheckedArr((prev) => [...prev, meetingId]);
    }
    if (isCheckAll === true) {
      setIsCheckAll(false);
      e.target.checked = false;
    }
  };
  const deleteList = () => {
    axios
      .post('http://localhost:8080/meeting/delete', {
        headers: {
          Authorization: `Bearer ${cookie.get('JSESSIONID')}`
        },
        withCredentials: true,
        meetingsId: checkedArr
      })
      .then((res) => {
        console.log(res);
        if (window.confirm('정말 삭제 하시겠습니까?')) {
          window.location.reload();
        }
      });
    setIsCheckAll(false);
    setCheckedArr([]);
  };
  function TotalMinut(item) {
    return (
      Number(item.end.substring(9, 11) * 60) +
      Number(item.end.substring(12, 14)) -
      (Number(item.start.substring(9, 11) * 60) +
        Number(item.start.substring(12, 14)))
    );
  }
  function EndSmallThanStartHour(item) {
    return Math.trunc(
      (24 * 60 -
        (Number(item.start.substring(9, 11) * 60) +
          Number(item.start.substring(12, 14))) +
        (Number(item.end.substring(9, 11) * 60) +
          Number(item.end.substring(12, 14)))) /
        60
    );
  }
  function EndSmallThanStartMinut(item) {
    return Math.trunc(
      (24 * 60 -
        (Number(item.start.substring(9, 11) * 60) +
          Number(item.start.substring(12, 14))) +
        (Number(item.end.substring(9, 11) * 60) +
          Number(item.end.substring(12, 14)))) %
        60
    );
  }
  function EndBigThanStartHour(item) {
    return Math.trunc(
      (Number(item.end.substring(9, 11) * 60) +
        Number(item.end.substring(12, 14)) -
        (Number(item.start.substring(9, 11) * 60) +
          Number(item.start.substring(12, 14)))) /
        60
    );
  }
  function EndBigThanStartMinut(item) {
    return Math.trunc(
      (Number(item.end.substring(9, 11) * 60) +
        Number(item.end.substring(12, 14)) -
        (Number(item.start.substring(9, 11) * 60) +
          Number(item.start.substring(12, 14)))) %
        60
    );
  }
  const handlePageClick = (data) => {
    setListArr([]);
    const params = {
      page: data.selected,
      size: 4
    };
    axios
      .get('http://localhost:8080/meeting/mymeeting', {
        withCredentials: true,
        params
      })
      .then((res) => {
        console.log(res);
        const pCount = res.data.p_MyMeetings.totalPages;
        setPageCount(pCount);
        setListArr(res.data.p_MyMeetings.content);
      });
  };

  const meetingListClick = (item) => {
    setMyDetailModalOpen(true);
    setMyMeetingID(item.meetingRoomId);
    setMyMeetingName(item.name);
    setMyMeetingStart(item.start);
    setMyMeetingEnd(item.end);

    const params = {
      start: item.start,
      meetingId: item.meetingId
    };
    axios
      .get('http://localhost:8080/meeting/detailPage', {
        withCredentials: true,
        params
      })
      .then((res) => {
        console.log(res);
        setMyAttendList(res.data.detail.nameList);
      })
      .catch((err) => console.log(err));
  };

  const onCloseAllInput = () => {
    setMyDetailModalOpen(false);
  };
  const onCloseInput = () => {
    setMyDetailModalOpen(false);
  };

  useEffect(() => {
    const params = {
      page: 0,
      size: 4
    };
    axios
      .get('http://localhost:8080/meeting/mymeeting', {
        withCredentials: true,
        params
      })
      .then((res) => {
        console.log(res);
        const pCount = res.data.p_MyMeetings.totalPages;
        setPageCount(pCount);
        setListArr(res.data.p_MyMeetings.content);
      });
  }, []);
  return (
    <ViewMeeting>
      <ViewMeetingHeader>
        <h3>나의 예약</h3>
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
              <input
                type="checkbox"
                onChange={(e) => changeAllCheck(e.target.checked)}
                checked={checkedArr.length === listArr.length}
                onClick={onCloseAllInput}
              />
            </td>
            <ViewMeetingListTd>회의명</ViewMeetingListTd>
            <td>회의 일시</td>
            <td>회의 시간</td>
            <td>회의실</td>
            <td>개설자</td>
          </ViewMeetingListTr>
        </thead>
        <ColorChangeBody>
          {console.log(checkedArr)}
          {listArr.map((item) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    checkingCheckedBox(item.meetingId, e);
                    onCloseInput();
                  }}
                  checked={!!checkedArr.includes(item.meetingId)}
                />
              </td>
              <td onClick={() => meetingListClick(item)}>
                <MeetingRoomColorDiv>
                  <MeetingRoomColor type={item.type} />
                  <span>{item.name}</span>
                </MeetingRoomColorDiv>
              </td>
              <td onClick={() => meetingListClick(item)}>{item.start}</td>
              <MeetingTime onClick={() => meetingListClick(item)}>
                {TotalMinut(item) < 0
                  ? EndSmallThanStartMinut(item) !== 0
                    ? `${EndSmallThanStartHour(
                        item
                      )}시간 ${EndSmallThanStartMinut(item)}분`
                    : `${EndSmallThanStartHour(item)}시간`
                  : EndBigThanStartMinut(item) !== 0
                  ? EndBigThanStartHour(item) !== 0
                    ? `${EndBigThanStartHour(item)}시간 ${EndBigThanStartMinut(
                        item
                      )}분`
                    : `${EndBigThanStartMinut(item)}분`
                  : `${EndBigThanStartHour(item)}시간`}
              </MeetingTime>
              <td
                onClick={() => meetingListClick(item)}
              >{`회의실${item.meetingRoomId}`}</td>
              <td onClick={() => meetingListClick(item)}>{item.createdBy}</td>
            </tr>
          ))}
        </ColorChangeBody>
      </ListTable>
      <PagiNateDiv>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          nextClassName="page-item"
          activeClassName="active"
        />
      </PagiNateDiv>
      {MydetailModalOpen && (
        <ViewMyDetails
          setMyDetailModalOpen={setMyDetailModalOpen}
          MymeetingId={MymeetingID}
          MymeetingName={MymeetingName}
          MymeetingStart={MymeetingStart}
          MymeetingEnd={MymeetingEnd}
          MyattendList={MyattendList}
          setUpdateModalOpenInDetail={setUpdateModalOpen}
        />
      )}
      {updateModalOpen && (
        <UpdateModal setUpdateModalOpen={setUpdateModalOpen} />
      )}
    </ViewMeeting>
  );
}
const ViewMeeting = styled.div`
  position: relative;
  width: 95%;
  background: #ffffff;
  border-radius: 12px;
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  height: 53%;
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
  border-radius: 10px;

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
    width: 20%;
  }
  & td:nth-child(1) {
    width: 30px;
  }
`;
const ViewMeetingListTd = styled.td`
  width: 300px;
  padding: 0px;
`;
const MeetingTime = styled.td`
  color: #0594ff;
  font-weight: bolder;
`;
const ColorChangeBody = styled.tbody`
  & tr:hover {
    background-color: aliceblue;
  }
`;

const MeetingRoomColorDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 40px;
`;
const MeetingRoomColor = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => {
    let MeetingColor = '';
    switch (props.type) {
      case 'A_Type':
        MeetingColor = '#17C2E0';
        break;
      case 'B_Type':
        MeetingColor = '#5F44EA';
        break;
      case 'C_Type':
        MeetingColor = '#08EB9A';
        break;
      default:
        alert('어떤 유형의 type인지 정해지지 않았습니다...');
    }
    return MeetingColor;
  }};
  margin-right: 15px;
`;

const DeleteIcon = styled(DeleteForeverIcon)``;

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PagiNateDiv = styled.div`
  position: absolute;
  bottom: 5px;
  left: 40%;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-right: 100px;
  }

  & ul {
    list-style: none;
    padding: 0;
  }

  & ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin: 10px;
    border-radius: 50%;
  }
  & ul.pagination li:hover {
    cursor: pointer;
    background-color: #17c2e0;
    opacity: 50%;
    color: white;
  }
  & ul.pagination li:first-child:hover {
    background-color: white;
  }
  & ul.pagination li:first-child a:hover {
    color: #337ab7;
  }
  & ul.pagination li:last-child:hover {
    background-color: white;
  }
  & ul.pagination li:last-child a:hover {
    color: #337ab7;
  }

  & ul.pagination li:first-child {
    border-radius: 50%;
  }

  & ul.pagination li:last-child {
    border-radius: 50%;
  }

  & ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }

  & ul.pagination li.active a {
    color: white;
  }

  & ul.pagination li.active {
    background-color: #17c2e0;
    opacity: 80%;
  }

  & ul.pagination li a:hover,
  & ul.pagination li a.active {
    color: white;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
export default MyMeetingList;
