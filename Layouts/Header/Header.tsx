import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { Button } from '@paljs/ui/Button';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import User from '@paljs/ui/User';
import { breakpointDown } from '@paljs/ui/breakpoints';
import styles from './Header.module.scss';
import { getLocalUserName } from '../../utils/common';

const Label = styled.span`
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const localFullName = getLocalUserName();
    console.log(localFullName);
    setFullName(localFullName);
  }, []);

  const router = useRouter();

  return (
    <LayoutHeader fixed>
      <div className={`${styles['header']}`}>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className={`${styles['header__logo']}`}>Clasroom Admin</a>
                </Link>
              ),
            },
            {
              content: (
                <Button size="Small" onClick={() => props.changeDir()}>
                  {props.dir}
                </Button>
              ),
            },
          ]}
        />
        <Actions
          size="Small"
          className={`${styles['header__right']}`}
          actions={[
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Profile', link: { href: '/profile' } },
                    { title: 'Log out', link: { href: '/auth/logout' } },
                  ]}
                  Link={Link}
                >
                  <User
                    image="url('https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg')"
                    name={fullName}
                    title="Admin"
                    size="Medium"
                  />
                </ContextMenu>
              ),
            },
          ]}
        />
      </div>
    </LayoutHeader>
  );
};
export default Header;
