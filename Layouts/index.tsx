import React, { useState, useRef, useEffect, Fragment } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import { Layout, LayoutContent, LayoutFooter, LayoutContainer, LayoutColumns, LayoutColumn } from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header/Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import { EvaIcon } from '@paljs/ui/Icon';
import { Button } from '@paljs/ui/Button';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import Link from 'next/link';
import menuItems from './menuItem';
import SEO from '../components/SEO/SEO';

const getDefaultTheme = (): DefaultTheme['name'] => {
  return 'default';
};

interface ILayoutProps {
  Component?: any;
  pageProps?: any;
}

const LayoutPage: React.FC<ILayoutProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<MenuRefObject>(null);
  const [seeHeader, setSeeHeader] = useState(true);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const localTheme = getDefaultTheme();
    if (localTheme !== theme && theme === 'default') {
      setTheme(localTheme);
    }
  }, []);

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  return (
    <Fragment>
      <SEO />
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                theme={{ set: changeTheme, value: theme }}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
              {!authLayout && (
                <Sidebar
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  {seeHeader && (
                    <header>
                      <Button
                        size="Tiny"
                        status="Primary"
                        onClick={() => {
                          setMenuState(!menuState);
                          menuRef.current?.toggle();
                        }}
                        fullWidth
                      >
                        {menuState ? <EvaIcon name="arrow-circle-up" /> : <EvaIcon name="arrow-circle-down" />}
                      </Button>
                    </header>
                  )}
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menuItems}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">
                    <Component {...pageProps} />
                  </LayoutColumn>
                </LayoutColumns>
                {!authLayout && <LayoutFooter>Classroom - ADMIN</LayoutFooter>}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutPage;
