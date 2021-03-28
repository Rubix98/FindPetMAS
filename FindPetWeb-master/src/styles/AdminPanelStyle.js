import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  width: 80%;
  margin: 8% auto 0 auto;
  background: white;
  padding: 1%;
`;
export const HeaderText = styled.h1`
  color: #1b5e20;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 20px;
`;
export const HeaderValue = styled.h2`
  color: #1b5e20;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 18px;
`;
export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
`;
export const ImageContainer = styled.div`
  width: 48%;
  margin: 1% 0 1% 0;
`;
export const Image = styled.img`
  width: 150px;
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
export const UserActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
export const PostContainer = styled.div`
  position: relative;
`;
export const Icon = styled.img`
  width: 25px;
`;
export const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
`;
