import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  margin: 2% auto 0 auto;
  padding: 1%;
  background: white;
  width: 90%;
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
`;
export const SortPageButton = styled.button`
  width: 200px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid black;
  background: #50d752;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  :hover {
    background: #43d034;
  }
`;
export const SortContainer = styled.div`
  display: flex;
  margin: 1% auto 1% auto;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 801px) {
    width: 80%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const SortRow = styled.div`
  @media (max-width: 800px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const SortLabel = styled.label`
  justify-content: space-between;
  display: flex;
  @media (min-width: 801px) {
    width: 40%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  font-size: 14px;
  margin: 1% 0 0 0;
`;
export const SortLabelLocation = styled.label`
  justify-content: space-between;
  display: flex;
  width: 50%;
  margin: 1% 0 0 0;
  flex-direction: column;
`;
export const SortSelect = styled.select`
  width: 55%;
  border: 1px solid black;
  outline: none;
  font-weight: bold;
`;
export const SortInput = styled.input`
  width: 55%;
  box-sizing: border-box;
  padding: 1%;
  border: 1px solid black;
  outline: none;
  font-weight: bold;
`;
export const SortButton = styled.button`
  width: 300px;
  padding: 5px;
  font-size: 18px;
  border: 1px solid black;
  background: #50d752;
  font-weight: bold;
  text-align: center;
  margin: 1% auto 1% auto;
  cursor: pointer;
  outline: none;
  :hover {
    background: #43d034;
  }
`;
export const PostTextHeader = styled.h1`
  text-align: center;
  font-size: 20px;
  color: #1b5e20;
`;
export const PostInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1% auto 1% auto;
  text-align: center;
  flex-direction: row;
  width: 100%;
`;
export const PostRow = styled.div`
  width: 50%;
  margin: 1% auto 1% auto;
`;
export const PostInfoItem = styled.div`
  font-size: 16px;
  padding: 1%;
  @media (min-width: 801px) {
    width: 40%;
  }
  @media (max-width: 800px) {
    width: 60%;
  }
  margin: 1% auto 1% auto;
  color: black;
  background: #43d034;
  border: 1px solid black;
`;
export const ImagesContainer = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
  flex-direction: row;
  justify-content: space-around;
`;
export const TextPostMinHeader = styled.h2`
  text-align: center;
  font-size: 19px;
  color: #1b5e20;
`;
export const HeaderCommentsText = styled.h3`
  font-size: 15px;
  color: #1b5e20;
`;
export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
   {
    /*justify-content: space-between;*/
  }
  flex-direction: column;
`;
export const PostInfoParagraph = styled.p`
  margin: 0;
  font-size: 16px;
`;
export const CommentsContainer = styled.div`
  @media (max-width: 800px) {
    margin: 0 0 0 60px;
  }
  margin: 0 0 0 10%;
`;
export const Comment = styled.div`
  border-bottom: 1px solid black;
  margin: 5% 0 0 5%;
`;
export const MapContainer = styled.div`
  margin: 1% auto 1% auto;
`;
export const HeaderCommentsElements = styled.h4`
  font-size: 14px;
  color: #1b5e20;
  text-align: center;
`;
export const CommentContainer = styled.div`
  margin: 2% auto 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  text-align: center;
`;
export const AddCommentContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1% auto 1% auto;
`;
export const AddCommentButton = styled.button`
  background: green;
  height: 50px;
  color: white;
  @media (min-width: 1000px) {
    font-size: 18px;
    width: 300px;
  }
  box-sizing: border-box;
  outline: none;
  background: #50d752;
  cursor: pointer;
  margin: 1% auto 0 auto;
  border: 1px solid black;
`;
export const TextArea = styled.textarea`
  height: 100px;
  box-sizing: border-box;
  min-width: 250px;
  line-height: 20px;
  font-size: 14px;
  resize: none;
  outline: none;
  border: 1px solid black;
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
export const PostLink = styled(Link)`
  background: green;
  height: 50px;
  color: white;
  font-size: 18px;
  @media (min-width: 1000px) {
    width: 300px;
  }
  @media (max-width: 999px) {
    width: 80%;
  }
  text-decoration: none;
  box-sizing: border-box;
  outline: none;
  background: #50d752;
  cursor: pointer;
  margin: 1% auto 0 auto;
  border: 1px solid black;
  :active,
  :hover {
    text-decoration: none;
    font-weight: bold;
  }
`;
export const UserActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 800px) {
    margin: 15% 0 0 0;
  }
`;
export const Icon = styled.img`
  width: 25px;
`;
export const PostImage = styled.img`
  width: 250px;
  @media (max-width: 800px) {
    margin: 1% auto 1% auto;
  }
`;
