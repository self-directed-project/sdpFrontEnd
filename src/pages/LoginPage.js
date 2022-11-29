import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import OurMeetingIcon from '../components/OurMeetingIcon';

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & p {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 18px;
    color: #666666;
    position: absolute;
    bottom: -15px;
  }
`;
const LoginMain = styled.div`
  width: 90%;
  position: relative;
  margin-bottom: 60px;

  & input {
    background: transparent;
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.15);
    padding: 20px 0px 5px 0px;
    font-size: 10pt;
    width: 100%;
    padding-bottom: 20px;
  }
  & input::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  & input:focus {
    outline: none;
    border: none;
    border-bottom: 1.5px solid #0594ff;
  }

  & span {
    position: absolute;
    right: 0px;
    bottom: -30px;
    color: #0594ff;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 30px;
  }
`;
const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & div {
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;
  }
  & input {
    background-color: #0594ff;
    width: 90%;
    padding: 15px 0px;
    border-radius: 10px;
    color: white;
    border: none;
  }
`;

const cookie = new Cookies();

function LoginPage() {
  let userCookie = '';
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('user_id')) {
      navigate('/main/login');
    } else {
      navigate('/');
    }
  }, []);
  const StartLogin = () => {
    const toData = {
      username: `${id}`,
      password: `${password}`
    };
    axios
      .post('http://localhost:8080/login', {
        headers: {
          'Set-Cookie': cookie.get('JSESSIONID')
        },
        username: toData.username,
        password: toData.password
      })
      .then((res) => {
        console.log(res);
        const { status } = res.data;

        if (status === 200) {
          userCookie = cookie.get('JSESSIONID');
          console.log('로그인 성공');
          navigate('/main/login');
          sessionStorage.setItem('user_id', userCookie);
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
  const onSubmit = (e) => {
    e.preventDefault();
    StartLogin();
    setId('');
    setPassword('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Login>
        <LoginHeader>
          <div>
            <OurMeetingIcon />
            <h2>OUR MEETING</h2>
          </div>
          <p>회의실 예약 시스템</p>
        </LoginHeader>
        <LoginMain>
          <input
            type="text"
            placeholder="아이디"
            onChange={onIdHandler}
            value={id}
            className="login-input"
          />
          <br />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={onPasswordHandler}
            value={password}
            className="login-input"
          />
          <span className="login-main__span">비밀번호 찾기</span>
        </LoginMain>
        <LoginFooter>
          <input type="submit" onClick={onClick} value="로그인" />
          <div>
            <p>Made Our Meeting</p>
          </div>
        </LoginFooter>
      </Login>
    </form>
  );
}
export default LoginPage;
