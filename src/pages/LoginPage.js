import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userInfo = {
    id: 'kyoungwoo',
    password: 1234
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onClick = () => {
    if (id === userInfo.id && password === String(userInfo.password)) {
      navigate(`/main/${id}`);
    } else {
      alert('입력 정보가 틀렸습니다.');
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="아이디"
        onChange={onIdHandler}
        value={id}
      />
      <br />
      <input
        type="text"
        placeholder="비밀번호"
        onChange={onPasswordHandler}
        value={password}
      />
      <br />
      <input type="submit" value="로그인" onClick={onClick} />
    </div>
  );
}
export default LoginPage;
