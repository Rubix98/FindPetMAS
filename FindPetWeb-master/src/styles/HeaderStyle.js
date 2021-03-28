import styled from "styled-components";
import { Link } from "react-router-dom";
export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 250;
  width: 100%;
  background: rgba(109, 171, 59, 1);
  background: linear-gradient(
    to right,
    rgba(109, 171, 59, 1) 0%,
    rgba(54, 145, 72, 1) 80%
  );
  display: flex;
  justify-content: space-between;
  box-shadow: 0 8px 6px -6px #333;
  border-bottom: 1px solid black;
  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;
export const Navigator = styled.nav`
  width: ${props => (props.user ? "100%" : "40%")};
  @media (min-width: 1200px) {
    justify-content: flex-end;
    margin: 0 1% 0 0;
    display: flex;
  }
  @media (max-width: 1200px) {
    margin: 5% 0 0 1%;
    display: ${props => (props.display ? "block" : "none")};
  }
`;
export const List = styled.ul`
  margin: 0 1% 0 1%;
  padding: 0;
  list-style-type: none;
  display: flex;
  width: 60%;
  justify-content: flex-end;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;
export const Logo = styled.span`
  color: #4dff4d;
  font-size: 40px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  @media (max-width: 800px) {
    font-size: 20px;
  }
`;
export const ListItem = styled.li`
  padding: 0;
  margin: 0 2% 0 2%;
  white-space: nowrap;
  align-items: center;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1200px) {
    margin: 2% 0 0 0;
  }
`;
export const NotifyText = styled.span`
  font-size: 20px;
  margin: auto;
`;
export const MenuContainer = styled.div`
  position: absolute;
  width: 280px;
  margin: 3.2% 0 0 0;
  @media (min-width: 1400px) {
    margin: 2% 0 0 0;
  }
`;
export const NotifyContainer = styled.div`
  text-align: center;
  display: flex;
  position: fixed;
  @media (min-width: 1400px) {
    margin: 2% 0 0 0;
  }
  @media (max-width: 1399px) {
    margin: 3.2% 0 0 0;
  }
  z-index: 30;
  width: 100%;
  text-align: center;
  padding: 5px;
  background-color: #08b62c;
  @media (max-width: 800px) {
    margin: ${props =>
      props.mobile && props.user ? "48.5% 0 0 0" : "25.5% 0 0 0"};
  }
`;
export const UserMenuItem = styled.li`
  background: #32c751;
  cursor: pointer;
  display: ${props => (props.isOpen ? "block" : "none")};
  font-size: 18px;
  :hover {
    font-weight: bold;
  }
`;
export const UserMenuLink = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    font-weight: bold;
  }
`;
export const UserMenu = styled.ul`
  list-style-type: none;
  text-align: center;
  padding: 0;
  margin: 0;
`;
export const UserName = styled.button`
  border: none;
  padding: 10px;
  color: #eeeeee;
  cursor: pointer;
  background: #32c751;
  font-size: 18px;
  :hover {
    text-shadow: 2px 2px 4px #000000;
    border-radius: 25px;
  }
`;
export const UserItem = styled.li`
  cursor: pointer;
`;
export const LinkItem = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto 0 auto;
  padding: 2%;
  font-size: 15px;
  border-radius: 25px;
  width: 100%;
  color: white;
  text-decoration: none;
  :hover {
    background: #11d139;
  }
  @media (max-width: 1200px) {
    border-radius: 0;
  }
`;
export const IconMenu = styled.img`
  width: 25px;
  cursor: pointer;
  @media (min-width: 1200px) {
    display: none;
  }
`;
export const MobileContainer = styled.div`
  @media (max-width: 1200px) {
    display: flex;
  }
`;
export const AppIcon = styled.img`
  width: 25px;
  @media (max-width: 800px) {
    width: 14px;
  }
`;
