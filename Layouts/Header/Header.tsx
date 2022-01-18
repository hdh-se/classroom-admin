import React from 'react';
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
  const router = useRouter();
  const themeOptions = () => [
    {
      value: 'default',
      label: (
        <span className={`${styles['header__label']}`}>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Default
        </span>
      ),
    },
    {
      value: 'dark',
      label: (
        <span className={`${styles['header__label']}`}>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Dark
        </span>
      ),
    },
    {
      value: 'cosmic',
      label: (
        <span className={`${styles['header__label']}`}>
          <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
          Cosmic
        </span>
      ),
    },
    {
      value: 'corporate',
      label: (
        <span className={`${styles['header__label']}`}>
          <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
          Corporate
        </span>
      ),
      selected: true,
    },
  ];
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
                <Select
                  className={`${styles['header__them-select']}`}
                  instanceId="react-select-input"
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions().find((item) => item.value === props.theme.value)}
                  options={themeOptions()}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                />
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
                    { title: 'Log out', link: { href: '/logout' } },
                  ]}
                  Link={Link}
                >
                  <User
                    image="url('https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg')"
                    name="Huu Pham"
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
