import axios from 'axios';
import { useEffect, useState } from 'react';
import './MainPage.css';

function MainPage() {
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
    <div className="view-meeting">
      <div className="view-meeting__header">
        <h3>나의 예약</h3>
        <button type="button" onClick={deleteList}>
          삭제
        </button>
      </div>
      <div className="view-meeting__list">
        <form className="view-meeting__list__form">
          <div className="view-meeting__list__info">
            {isCheckAll ? (
              <input type="checkbox" onClick={changeAllCheck} checked />
            ) : (
              <input type="checkbox" onClick={changeAllCheck} />
            )}
            <span>회의명</span>
            <span>회의 일시</span>
            <span>회의 시간</span>
            <span>회의실</span>
            <span>개설자</span>
          </div>
          {console.log(checkedArr)}
          {listArr.map((item) => (
            <div key={item.id} className="addList">
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
              <span>{item.name}</span>
              <span>{item.name}</span>
              <span>{item.name}</span>
              <span>{item.name}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
export default MainPage;
