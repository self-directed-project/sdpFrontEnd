<ViewMeeting>
  <ViewMeetingHeader>
    <h3>나의 예약</h3>
    <button type="button" onClick={deleteList}>
      삭제
    </button>
  </ViewMeetingHeader>
  <ViewMeetingList>
    <form className="view-meeting__list__form">
      <ListTable>
        <thead>
          <ViewMeetingListTr>
            {isCheckAll ? (
              <input type="checkbox" onClick={changeAllCheck} checked />
            ) : (
              <input type="checkbox" onClick={changeAllCheck} />
            )}
            <th>회의명</th>
            <th>회의 일시</th>
            <th>회의 시간</th>
            <th>회의실</th>
            <th>개설자</th>
          </ViewMeetingListTr>
        </thead>
        <tbody>
          {listArr.map((item) => (
            <tr>
              <ViewMeetingListInfoMain key={item.id}>
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
                <td>
                  <span>..</span>
                  <span>{item.meetingName}</span>
                </td>
                <td>{item.date}</td>
                <td>{item.meetingTime}</td>
                <td>{item.name}</td>
                <td>{item.Founder}</td>
              </ViewMeetingListInfoMain>
            </tr>
          ))}
        </tbody>
      </ListTable>
      {console.log(checkedArr)}
    </form>
  </ViewMeetingList>
</ViewMeeting>;
