import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginLogo from '../img/loginScreen_logo.png';
import './LoginPage.css';

function LoginPage() {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

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
      .post('http://localhost:8080/login', {
        headers: {
          'Set-cookie': setCookie
        },
        username: toData.username,
        password: toData.password
      })
      .then((res) => {
        const { status } = res.data;

        if (status === 200) {
          console.log('로그인 성공');
          navigate(`/main/${id}`);
          sessionStorage.setItem('user_id', id);
        }
      })
      .catch((err) => {
        const { code } = err.response.data;
        if (code === 'POSTS_NOT_FOUND_ID') {
          alert('아이디가 틀렸습니다..');
        } else if (code === 'POSTS_NOT_FOUND_PW') {
          alert('패스워드가 틀렸습니다..');
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
