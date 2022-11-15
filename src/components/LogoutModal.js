/* eslint-disable react/button-has-type */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components';

const Div = styled.div`
  width: 90px;
  height: 40px;
  position: absolute;
  right: 2px;
  top: 45px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
`;
const DivSpan = styled.span`
  padding: 5px;
  font-size: 13px;
`;

const cookie = new Cookies();

// eslint-disable-next-line react/prop-types
function LogoutModal({ setModalOpen, id, title, content, writer }) {
  const navigate = useNavigate();
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    setModalOpen(false);
    if (window.confirm('로그아웃 하시겠습니까?')) {
      axios
        .get('http://localhost:8080/logout', {
          headers: {
            Authorization: `Bearer ${cookie.get('JSESSIONID')}`
          },
          withCredentials: true
        })
        .then((response) => {
          if (response.data.status === 200) {
            sessionStorage.removeItem('user_id');
            navigate('/');
          }
        })
        .catch((err) => {
          alert('등록된 정보가 없습니다...');
          sessionStorage.removeItem('user_id');
          navigate('/');
        });
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
