import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginLogo from '../img/loginScreen_logo.png';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user_id');
    if (sessionStorage.getItem('user_id') === null) {
      navigate('/');
    } else {
      navigate(`/main/${user}`);
    }
  }, []);
  const StartLogin = () => {
    const setCookie = sessionStorage.getItem('user_id');
    const toData = {
      username: `${id}`,
      password: `${password}`
    };
    axios
      .post('http://localhost:5000/data', {
        headers: {
          'Content-Type': 'application/json',
          'Set-cookie': setCookie
        },
        data: toData
      })
      .then((res) => {
        console.log(res);
        const userId = `${res.data.data.username}`;
        const userPw = `${res.data.data.password}`;
        console.log('res.data.userId = ', userId);
        console.log('res.data.userPw = ', userPw);
        if (userId === undefined) {
          alert('입력하신 id 가 일치하지 않습니다.');
        } else if (userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log('입력하신 비밀번호 가 일치하지 않습니다.');
          alert('입력하신 비밀번호 가 일치하지 않습니다.');
        } else if (userId === id) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log('로그인 성공');
          navigate(`/main/${id}`);
          sessionStorage.setItem('user_id', id);
        }
      })
      .catch((err) => {
        console.log(err);
        const { config } = err;
        const { status } = err.request;
        if (err.request) {
          // 요청이 이루어졌고 서버가 응답했을 경우
          if (status === 404) {
            console.log(`${config.url} not found`);
          }
          if (status === 500) {
            console.log('Server error');
          }
        }
      });
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onClick = () => {
    StartLogin();
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
