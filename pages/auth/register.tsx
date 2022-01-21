import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Auth from '../../components/Auth/Auth';
import withUnAuth from '../../HOC/withUnAuth';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

const Register = () => {
  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Auth title="Create new account">
      <form>
        <Input fullWidth>
          <input type="text" placeholder="Username" />
        </Input>
        <Input fullWidth>
          <input type="email" placeholder="Email Address" />
        </Input>
        <Input fullWidth>
          <input type="password" placeholder="Password" />
        </Input>
        <Input fullWidth>
          <input type="password" placeholder="Confirm Password" />
        </Input>
        <Button status="Success" type="button" shape="SemiRound" fullWidth>
          Register
        </Button>
      </form>
      <p>
        Already have an account?{' '}
        <Link href="/auth/login">
          <a>Log In</a>
        </Link>
      </p>
    </Auth>
  );
};

export default withUnAuth(Register);
