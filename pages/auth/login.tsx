import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import Link from 'next/link';

import Auth, { Group } from '../../components/Auth/Auth';
import withAuth from '../../HOC/withAuth';
import withUnAuth from '../../HOC/withUnAuth';
import { setToken } from '../../utils/common';

const Login = () => {
  const handleLogin = () => {
    setTimeout(() => {
      setToken('hihihi');
      window.location.reload();
    }, 800);
  };

  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <form>
        <InputGroup fullWidth>
          <input type="email" placeholder="Email Address" />
        </InputGroup>
        <InputGroup fullWidth>
          <input type="password" placeholder="Password" />
        </InputGroup>
        <Group>
          <Checkbox checked onChange={onCheckbox}>
            Remember me
          </Checkbox>
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
    </Auth>
  );
};

export default withUnAuth(Login);
