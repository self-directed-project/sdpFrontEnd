/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const cookie = new Cookies();

function MyMeetingList() {
  const [listArr, setListArr] = useState([]);

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
    const Size = 4;
    console.log(data.selected + 1);
    axios
      .get('http://localhost:8080/meeting/all', {
        withCredentials: true,
        pageNumber: data.selected + 1,
        pageSize: Size
      })
      .then((res) => {
        console.log(res);
        setListArr(res.data.meetings.content);
      });
  };

  useEffect(() => {
    try {
      axios
        .get('http://localhost:8080/meeting/all', {
          headers: {
            Authorization: `Bearer ${cookie.get('JSESSIONID')}`
          },
          withCredentials: true,
          pageNumber: 1,
          pageSize: 4
        })
        .then((res) => {
          console.log(res.data);
          setListArr(res.data.meetings.content);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <ViewMeeting>
      <ViewMeetingHeader>
        <h3>전체 일정</h3>
      </ViewMeetingHeader>
      <ListTable>
        <thead>
          <ViewMeetingListTr>
            <td>No</td>
            <td>회의명</td>
            <ViewMeetingListTd>회의 일시</ViewMeetingListTd>
            <td>회의 시간</td>
            <td>회의실</td>
            <td>개설자</td>
          </ViewMeetingListTr>
        </thead>
        <ColorChangeBody>
          {console.log(listArr)}
          {listArr?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <MeetingRoomColorDiv>
                  <MeetingRoomColor type={item.meetingType} />
                  <span>{item.name}</span>
                </MeetingRoomColorDiv>
              </td>
              <td>{item.start}</td>
              <MeetingTime>
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
              <td>{item.meetingRoom.name}</td>
              <td>{item.meetingRoom.name}</td>
            </tr>
          ))}
        </ColorChangeBody>
      </ListTable>
      <PagiNateDiv>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={10}
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
    </ViewMeeting>
  );
}
const ViewMeeting = styled.div`
  position: absolute;
  left: 290px;
  top: 180px;
  width: 87%;
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
  overflow: hidden;
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

  & td {
    color: rgba(0, 0, 0, 0.5);
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
  display: flex;
  justify-content: center;
  align-items: center;
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
const PagiNateDiv = styled.div`
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
