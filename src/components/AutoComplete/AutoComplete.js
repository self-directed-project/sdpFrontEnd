import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import CardList from './CardList';

const AutoComplete = ({ getAttendees, width, isMembers }) => {
  const [inputVal, setInputVal] = useState('');
  const [isHavaInputVal, setIsHavaInputVal] = useState(false);
  const [List, setLIst] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [duplicateCard, setduplicateCard] = useState([]);
  const [nameCard, setNameCard] = useState([]);

  const getList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/meeting/reserve');
      setLIst(res.data.memberList);
    } catch (error) {
      console.log(error);
    }
  };

  const showDropDownList = () => {
    if (inputVal === '') {
      setIsHavaInputVal(false);
      setDropDownList([]);
    } else {
      const choosen = List.filter((item) => item.name.includes(inputVal));
      setDropDownList(choosen);
    }
  };
  const changeInputVal = (event) => {
    setInputVal(event.target.value);
    setIsHavaInputVal(true);
  };

  const eliminateDuplicate = () => {
    const uniq = (arr) => [
      [...new Set(arr.map(JSON.stringify))].map(JSON.parse)
    ];
    return uniq(duplicateCard);
  };

  const handleClickLi = (event) => {
    let card = '';
    for (let i = 0; i < dropDownList.length; i++) {
      if (Number(event.target.id) === dropDownList[i].id) {
        card = `${dropDownList[i].name}(${dropDownList[i].team}-${dropDownList[i].username})`;
        break;
      }
    }
    setduplicateCard([...duplicateCard, { id: event.target.id, text: card }]);
    setNameCard(eliminateDuplicate()[0]);
  };

  const handleDelete = (id) => {
    const deleteCard = nameCard.filter((card) => card.id !== id);
    setduplicateCard(deleteCard);
    setNameCard(deleteCard);
  };

  const listItems = dropDownList.map((list) => (
    <AttendeesBtn type="button" id={list.id} onClick={handleClickLi}>
      {list.name} {list.team}-{list.username}
    </AttendeesBtn>
  ));
  getAttendees(nameCard);
  useEffect(() => {
    getList();
  }, []);
  useEffect(showDropDownList, [inputVal]);

  return (
    <div>
      <div>
        <AttendeesInput
          type="text"
          value={inputVal}
          onChange={changeInputVal}
          width={width}
        />
      </div>
      {isHavaInputVal && <BtnDiv>{listItems}</BtnDiv>}
      {{ isMembers } ? (
        <AttendeesList>
          <CardList cardList={nameCard} onDelete={handleDelete} />
        </AttendeesList>
      ) : (
        <AttendeesList>
          <CardList cardList={nameCard} onDelete={handleDelete} />
        </AttendeesList>
      )}
    </div>
  );
};

AutoComplete.propTypes = {
  getAttendees: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  isMembers: PropTypes.bool.isRequired
};

const BtnDiv = styled.div`
  width: 390px;
  height: 45px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const AttendeesBtn = styled.button`
  width: 375px;
  height: 45px;
  border: 0;
  border: 1px solid #d7e3f1;
  border-top: none;
  background-color: white;
  text-align: left;
  &:hover {
    background-color: #f9fdff;
    & > span {
      color: #0594ff;
    }
  }
`;
const AttendeesInput = styled.input`
  border: 0;
  border-bottom: 1px solid #d7e3f1;
  width: ${(props) => props.width};
  height: 60px;
  outline: 0;
  font-size: 18px;
  font-weight: 500;
  &:focus {
    border-bottom: 2px solid #0594ff;
  }
`;

const AttendeesList = styled.div`
  margin-top: 10px;
  height: 120px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
export default AutoComplete;
