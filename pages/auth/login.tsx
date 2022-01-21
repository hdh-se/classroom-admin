import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState } from 'react';
import Link from 'next/link';

import Auth, { Group } from '../../components/Auth/Auth';
import withAuth from '../../HOC/withAuth';
import withUnAuth from '../../HOC/withUnAuth';
import { setLocalFullName, setLocalUserName, setToken } from '../../utils/common';
import { apiAdmin } from '../../services/apiAction/apiAdmin';
import Loading from '../../components/Loading/Loading';
import { Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setLoading(true);
    apiAdmin
      .login({ password: password, username: userName })
      .then((res) => {
        let token = res.data?.content?.token;
        let fullName = res.data?.content?.fullName;
        let userName = res.data?.content?.username;
        setToken(token);
        setLocalUserName(userName);
        setLocalFullName(fullName);

        setLoading(false);
        window.location.replace('/');
      })
      .catch((err) => {
        setMessage('Đăng nhập không thành công, tài khoản hoặc mật khẩu không chính xác');
        setLoading(false);
      });
  };

  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <form>
        <InputGroup fullWidth>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup fullWidth>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputGroup>
        <Group>
          <Link href="/auth/request-password">
            <a>Forgot Password?</a>
          </Link>
        </Group>
        <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </form>
      <p>
        Don&apos;t have account?{' '}
        <Link href="/auth/register">
          <a>Register</a>
        </Link>
      </p>
      {loading && <Loading />}
      {!!message && <Alert variant={'danger'}>{message}</Alert>}
    </Auth>
  );
};

export default withUnAuth(Login);
