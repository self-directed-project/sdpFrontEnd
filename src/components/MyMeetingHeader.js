import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingIcon from './SettingIcon';
import LogoutModal from './LogoutModal';

const HeaderMainDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
`;
const ColorSpan = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  margin-left: 10px;
`;
const ColorSpanType = styled.span`
  display: flex;
  justify-items: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;

  & p {
    margin-top: 10px;
    font-weight: 400;
    font-size: 10px;
    line-height: 12.52;
  }
`;

const ColorDiv = styled.div`
  width: 7.72px;
  height: 7.72px;
  background: ${(props) => props.color};
  margin: 10px;
`;

const HeaderDivSeeting = styled.div`
  position: absolute;
  top: 40px;
  right: 50px;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const AllamIcon = styled(NotificationsIcon)`
  position: relative;
  background-color: white;
  color: #4a5568;
  width: 80px;
  height: 80px;
  transform: scale(1.7);
  padding: 3px;
  border-radius: 5px;
  margin-right: 20px;
`;
const AllamIconDiv = styled.div`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  top: 8px;
  background-color: #ff4545;
`;

// eslint-disable-next-line react/prop-types
function MyMeetingList({ setModalOpen, modalOpen }) {
  const outside = useRef();
  const handleClickOutside = ({ target }) => {
    if (modalOpen && !outside.current.contains(target) === false) {
      setModalOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
  return (
    <HeaderMainDiv>
      <HeaderDiv ref={outside} onClick={handleClickOutside}>
        <p>내 회의 보기</p>
        <ColorSpan>
          <ColorSpanType>
            <ColorDiv color="#17C2E0" />
            <p>type1</p>
          </ColorSpanType>
          <ColorSpanType>
            <ColorDiv color="#5F44EA" />
            <p>type2</p>
          </ColorSpanType>
          <ColorSpanType>
            <ColorDiv color="#08EB9A" />
            <p>type3</p>
          </ColorSpanType>
        </ColorSpan>
      </HeaderDiv>
      <HeaderDivSeeting>
        <AllamIcon />
        <AllamIconDiv />
        <SettingIcon setModalOpen={setModalOpen} />
        {modalOpen && <LogoutModal setModalOpen={setModalOpen} />}
      </HeaderDivSeeting>
    </HeaderMainDiv>
  );
}
export default MyMeetingList;
