import React, { useState, useRef, useEffect, Fragment } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import { Layout, LayoutContent, LayoutFooter, LayoutContainer, LayoutColumns, LayoutColumn } from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import Link from 'next/link';
import menuItems from './menuItem';
import SEO, { SEOProps } from 'components/SEO';
import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';


const getDefaultTheme = (): DefaultTheme['name'] => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as DefaultTheme['name'];
  } else {
    const hours = new Date().getHours();
    return hours > 6 && hours < 19 ? 'corporate' : 'corporate';
  }
};

const LayoutPage: React.o<SEOProps> = ({ children, ...rest }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('corporate');
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
      <SEO {...rest} />
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            {!authLayout 
            && (
              <Header
                dir={dir}
                changeDir={changeDir}
                theme={{ set: changeTheme, value: theme }}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )
            }
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
                  <Layout className="cards">
                    <Row>
                      <Col breakPoint={{sm:10, md:5}}>
                        <Card>
                          <CardHeader>Ongoing Election details</CardHeader>
                          <CardBody>
                            Start: 12/12/12 <br/>
                            End: 1/1/1 <br/>
                            Type: Lok Sabha <br/> 
                            States: Karnataka, Maharashtra, Kerala <br/> 
                          </CardBody>
                        </Card>
                      </Col>
                      <Col breakPoint={{sm:10, md:5}}>
                        <Card>
                          <CardHeader>Custom Query</CardHeader>
                          <CardBody>
                            Start: 12/12/12 <br/>
                            End: 1/1/1 <br/>
                            Type: Lok Sabha <br/> 
                            States: Karnataka, Maharashtra, Kerala <br/> 
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col breakPoint={{xs:10, md:5}}>
                        <Card>
                          <CardHeader>Winning Party Details</CardHeader>
                          <CardBody>
                            Start: 12/12/12 <br/>
                            End: 1/1/1 <br/>
                            Type: Lok Sabha <br/> 
                            States: Karnataka, Maharashtra, Kerala <br/> 
                          </CardBody>
                        </Card>
                      </Col>
                      <Col breakPoint={{xs:10, md:5}}>
                        <Card>
                          <CardHeader>Voter Turnout details</CardHeader>
                          <CardBody>
                            Start: 12/12/12 <br/>
                            End: 1/1/1 <br/>
                            Type: Lok Sabha <br/> 
                            States: Karnataka, Maharashtra, Kerala <br/> 
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Layout>
                {!authLayout && <LayoutFooter>Footer</LayoutFooter>}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment> 
  );
};

export default LayoutPage;
