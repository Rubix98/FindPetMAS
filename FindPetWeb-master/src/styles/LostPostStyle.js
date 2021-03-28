import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  width: 80%;
  padding: 1%;
  background: white;
  color: black;
  padding: 1%;
  margin: 1% auto 0 auto;
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
`;
export const HeaderText = styled.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #1b5e20;
`;
export const UserLink = styled(Link)`
  color: #4caf50;
  font-size: 18px;
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
export const DateParagraph = styled.p`
  padding: 0;
  margin: 0;
`;
export const OuterContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 5% 0 5% 0;
  width: 100%;
`;
export const InnerContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
`;
export const InfoContainer = styled.div`
  width: 50%;
`;
export const InInfoContainer = styled.div`
  background: #43d034;
  text-align: center;
  margin: 0 auto 0 auto;
  width: 50%;
  padding: 1% 0 1% 0;
  border: 1px solid black;
`;
export const ValueParagraph = styled.p`
  font-weight: bold;
`;
export const HeaderValues = styled.h2`
  text-align: center;
  color: #1b5e20;
  font-size: 18px;
  margin: 0 0 1% 0;
  padding: 0;
`;
export const OuterContainerImage = styled.div`
  width: 100%;
  display: flex;
`;
export const InnerContainerImage = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  text-align: center;
`;
export const Image = styled.img`
  width: 250px;
  @media (max-width: 800px) {
    width: 120px;
  }
`;
export const CommentContainer = styled.div`
  margin: 0 0 0 15%;
`;
export const HeaderComment = styled.h3`
  text-align: center;
  color: #1b5e20;
  font-size: 15px;
  margin: 0 0 1% 0;
  padding: 0;
`;
export const ImageComment = styled.img`
  width: 190px;
`;
export const CommentInfo = styled.div`
  background: #43d034;
  text-align: center;
  margin: 0 auto 0 auto;
  width: 20%;
  padding: 1% 0 1% 0;
  border: 1px solid black;
`;
export const AddCommentButton = styled(Link)`
  background: #43d034;
  padding: 1%;
  height: 50px;
  font-size: 18px;
  text-align: center;
  padding: 1%;
  border: 1px solid black;
  text-decoration: none;
  margin: 1% auto 1% auto;
  :active,
  :visited {
    color: white;
    text-decoration: none;
  }
  :hover,
  :focus {
    font-weight: bold;
  }
`;
export const HeaderContainer = styled.div`
  @media (max-width: 800px) {
    margin: 10% 0 0 0;
  }
`;
