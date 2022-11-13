/* eslint-disable react/button-has-type */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  width: 90px;
  height: 40px;
  position: absolute;
  right: 50px;
  bottom: 8px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
`;
const DivSpan = styled.span`
  padding: 5px;
  font-size: 13px;
`;

// eslint-disable-next-line react/prop-types
function LogoutModal({ setModalOpen, id, title, content, writer }) {
  const navigate = useNavigate();
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    setModalOpen(false);
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sessionStorage.removeItem('user_id');
      navigate('/');
    } else {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  return (
    // 모달창을 useRef로 잡아준다.
    <Div onClick={closeModal}>
      <DivSpan>로그아웃</DivSpan>
    </Div>
  );
}
export default LogoutModal;
