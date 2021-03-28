import styled from "styled-components";
import { Link } from "react-router-dom";
export const MainContainer = styled.div`
  align-items: center;
  background: white;
  width: 60%;
   {
    /*margin: 20px auto auto auto;*/
  }
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
  padding: 1%;
  box-sizing: border-box;
`;
export const HeaderUserPanel = styled.span`
  font-size: 30px;
  @media (max-width: 800px) {
    font-size: 15px;
  }
`;
export const UserName = styled.span`
  font-weight: bold;
  color: #1b5e20;
`;
export const EditLink = styled(Link)`
  width: 325px;
  color: black;
  text-align: center;
  text-decoration: none;
  border: 1px solid black;
  padding: 10px;
  font-size: 20px;
  background: #50d752;
  display: ${props => (props.accept ? "block" : "none")};
  margin: 5% auto auto auto;
  cursor: pointer;
  outline: none;
  :hover {
    color: white;
    background: #43d034;
  }
  @media (max-width: 500px) {
    width: 160px;
  }
`;
export const CodeButton = styled.button`
  color: black;
  border: 1px solid black;
  font-size: 20px;
  background: #50d752;
  padding: 1%;

  text-decoration: none;
  display: ${props => (props.accept ? "block" : "none")};
  margin: 1% auto 1% auto;
  cursor: pointer;
  outline: none;
  :hover {
    background: #43d034;
  }
`;
export const UserInfoMain = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: 1% 0 1% 0;
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;
export const UserInfo = styled.span`
  font-weight: bold;
`;

export const HeaderNotice = styled.span`
  display: block;
  font-size: 28px;
  @media (max-width: 800px) {
    font-size: 14px;
  }
`;
export const HeaderTitle = styled.span`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  display: block;
  @media (max-width: 800px) {
    font-size: 16px;
  }
`;
export const NoticeItem = styled.div`
  display: flex;
  margin: 1% auto 1% auto;
  justify-content: center;
  flex-direction: column;
  font-size: 18px;
`;
export const LocationContainer = styled.div`
  display: block;
  font-size: 18px;
`;
export const NoticeBoldItem = styled.span`
  font-weight: bold;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;
export const Img = styled.img`
  width: 300px;
  margin: 5px;
  @media (max-width: 800px) {
    width: 100px;
  }
`;
export const ImageContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
`;
export const PostsContainer = styled.div`
  align-items: flex-start;
  margin-top: 30px;
`;
export const CommentContainer = styled.div`
  margin: 10px 10px 10px 100px;
  @media (max-width: 800px) {
    margin: 10px 10px 10px 60px;
  }
`;
export const MainCommentContainer = styled.div`
  margin-bottom: 150px;
`;
export const LinkText = styled(Link)`
  color: black;
  cursor: pointer;
`;
export const UserInfoContainer = styled.div`
  width: 80%;
  margin: 5% auto 1% auto;
`;
export const MainContainerPosts = styled.div`
  background: white;
  box-sizing: border-box;
  width: 60%;
  padding: 1%;
  margin: 1% auto 1% auto;
`;
export const DateText = styled.p`
  margin: 0;
`;
export const UserLink = styled(Link)`
  color: #4caf50;
  text-decoration: none;
  :active,
  :visited {
    color: #4caf50;
    text-decoration: none;
  }
  :hover,
  :focus {
    font-weight: bold;
  }
`;
export const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
`;
export const NoticeContainer = styled.div`
  display: flex;
  margin: 1% auto 1% auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
export const NoticeItemContainer = styled.div`
  width: 45%;
  background: #43d034;
  padding: 1%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
export const NoticeParagraph = styled.p`
  text-align: center;
  margin: 0 1% 0 1%;
  @media (max-width: 800px) {
    font-size: 10px;
  }
`;
export const UserActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    margin: 10% 0 0 0;
  }
`;
export const Icon = styled.img`
  width: 25px;
  @media (max-width: 800px) {
    width: 10px;
  }
`;
export const MobileContainer = styled.div`
  @media (max-width: 800px) {
    margin: 15% 0 0 0;
    font-size: 16px;
  }
`;
export const PostLink = styled(Link)`
  background: green;
  height: 50px;
  color: white;
  font-size: 18px;
  width: 100%;
  text-decoration: none;
  box-sizing: border-box;
  outline: none;
  background: #50d752;
  cursor: pointer;
  margin: 1% auto 0 auto;
  text-align: center;
  border: 1px solid black;
  :active,
  :hover {
    text-decoration: none;
    font-weight: bold;
  }
`;
export const PostActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
