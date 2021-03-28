import React, { useContext, useEffect, useState } from "react";
import {
  HeaderContainer,
  List,
  Logo,
  ListItem,
  NotifyText,
  NotifyContainer,
  UserMenuItem,
  UserMenu,
  UserName,
  UserItem,
  LinkItem,
  UserMenuLink,
  IconMenu,
  MobileContainer,
  Navigator,
  AppIcon,
  MenuContainer,
} from "./styles/HeaderStyle";
import OpenMenu from "./icons/open-menu.svg";
import { createGlobalStyle } from "styled-components";
import { NewAppInfo } from "./context/AppInfo";
import { Link, Router, Redirect } from "react-router-dom";
import Icon from "./images/ikonka.png";
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
  body{
    font-family: 'Ubuntu'
  }
`;
const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const userInfo = useContext(NewAppInfo);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  console.log(userInfo);
  useEffect(() => {}, [userInfo]);
  return (
    <div>
      <HeaderContainer>
        <GlobalStyle />
        {userInfo.user === null ? (
          <div>
            <AppIcon src={Icon} />
            <Logo>FindPetApp</Logo>
          </div>
        ) : (
          <UserMenu
            style={{ display: "flex", "justify-content": "space-between" }}
          >
            <UserItem>
              <UserName
                onClick={() => {
                  setIsOpenMenu(!isOpenMenu);
                }}
              >
                {userInfo.user.login ||
                  userInfo.user.adres_mail ||
                  userInfo.user.idUzytkownik}
              </UserName>
            </UserItem>
            <MenuContainer>
              {userInfo.user.typ == "M" && (
                <UserMenuItem isOpen={isOpenMenu}>
                  <UserMenuLink to="/adminpanel">
                    Panel Administracyjny
                  </UserMenuLink>
                </UserMenuItem>
              )}
            </MenuContainer>
            <MenuContainer>
              <UserMenuItem isOpen={isOpenMenu}>
                <UserMenuLink
                  to={{
                    pathname: "/userpanel",
                    params: { id: userInfo.user.idUzytkownik || null },
                  }}
                >
                  {console.log(userInfo.user.idUzytkownik)}
                  Profil
                </UserMenuLink>
              </UserMenuItem>
              <UserMenuItem
                isOpen={isOpenMenu}
                onClick={() => {
                  userInfo.logout();
                }}
              >
                Wyloguj
              </UserMenuItem>
            </MenuContainer>
          </UserMenu>
        )}

        {userInfo.user === null ? (
          <Navigator user={false} display={openMobile}>
            <List>
              <ListItem>
                <LinkItem to="/selectlogin">Zaloguj się</LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/register">Zarejestruj się</LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/about">O aplikacji</LinkItem>
              </ListItem>
            </List>
          </Navigator>
        ) : (
          <Navigator user={true} display={openMobile}>
            <List>
              <ListItem>
                <LinkItem to="/findposts">Zauważone zwierzęta</LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/lostposts">Zaginione zwierzęta</LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/findrequest">
                  Zgłoś zauważenie zwierzęcia
                </LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/lostrequest">
                  Zgłoś zaginięcie zwierzęcia
                </LinkItem>
              </ListItem>
              <ListItem>
                <LinkItem to="/about">O aplikacji</LinkItem>
              </ListItem>
            </List>
          </Navigator>
        )}
        <IconMenu
          src={OpenMenu}
          onClick={() => {
            let temp = openMobile;
            userInfo.changeMobileMenu();
            setOpenMobile((curr) => !curr);
          }}
        />
      </HeaderContainer>
      {userInfo.notify !== "" && (
        <NotifyContainer mobile={userInfo.mobileMenu} user={userInfo.user}>
          <NotifyText>{userInfo.notify}</NotifyText>
        </NotifyContainer>
      )}
    </div>
  );
};
export default Header;
