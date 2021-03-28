import styled from "styled-components";
export const MainContainer = styled.div`
  text-align: center;
  padding: 1%;
  background: white;
  width: 60%;
  margin: 20px auto auto auto;
  height: 50%;
`;
export const HeaderText = styled.span`
  font-size: 38px;
  margin: 0 0 5% 0;
  color: #1b5e20;
  font-weight: bold;
  display: block;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ChoiceButton = styled.button`
  width: 80%;
  margin: 0 0 10% 0;
  color: #212121;
  background-color: #4caf50;
  border: 1px solid black;
  font-size: 20px;
  padding: 20px;
  outline: none;
  cursor: pointer;
  :hover {
    color: white;
    background-color: #2e7d32;
  }
`;
