import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginLogo from '../img/loginScreen_logo.png';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userInfo = {
    id: 'ysy06053',
    password: 1234
  };
  const StartLogin = () => {
    const toData = {
      userId: `${id}`,
      userPw: `${password}`
    };
    axios
      .post('http://localhost:5000/data', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: toData
      })
      .then(console.log);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onClick = () => {
    if (id === userInfo.id && password === String(userInfo.password)) {
      StartLogin();
      navigate(`/main/${id}`);
    } else {
      alert('입력 정보가 틀렸습니다...');
    }
  };
  return (
    <div className="login">
      <header className="login-header">
        <div className="login-header__div">
          <img src={loginLogo} alt="logo" className="img" />
          <h1>OUR MEETING</h1>
        </div>
        <p className="login-header__p">회의실 예약 시스템</p>
      </header>
      <main className="login-main">
        <input
          type="text"
          placeholder="아이디"
          onChange={onIdHandler}
          value={id}
          className="login-input"
        />
        <br />
        <input
          type="text"
          placeholder="비밀번호"
          onChange={onPasswordHandler}
          value={password}
          className="login-input"
        />
        <span className="login-main__span">비밀번호 찾기</span>
      </main>
      <footer className="login-footer">
        <input type="submit" value="로그인" onClick={onClick} />
        <div>
          <p>Made Our Meeting</p>
        </div>
      </footer>
    </div>
  );
}
export default LoginPage;
