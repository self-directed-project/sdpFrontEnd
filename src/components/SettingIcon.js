import { useState, useRef } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding: 7px;
  background-color: white;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
`;
const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 10px;
`;
const SmallDiv = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 6px;
`;
const BigLine = styled.div`
  width: 20px;
  height: 3px;
  background-color: #4a5568;
`;
const SmallLine = styled.div`
  width: 10px;
  height: 3px;
  background-color: #4a5568;
  display: flex;
  text-align: left;
`;

// eslint-disable-next-line react/prop-types
function SettingIcon({ setModalOpen }) {
  const settingCLick = (e) => {
    setModalOpen(true);
  };
  return (
    <div>
      <Div onClick={settingCLick}>
        <BigDiv>
          <BigLine />
          <BigLine />
        </BigDiv>
        <SmallDiv>
          <SmallLine />
        </SmallDiv>
      </Div>
    </div>
  );
}
export default SettingIcon;
