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
export const TextInput = styled.input`
  border: 1px solid black;
  font-size: 30px;
  @media (max-width: 800px) {
    font-size: 14px;
  }
  padding: 5px;
  background: white;
  outline: none;
`;
export const ButtonLabel = styled.label`
  font-size: 28px;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;
export const FormButton = styled.button`
  background: #4caf50;
  border: 1px solid black;
  padding: 5px;
  font-size: 30px;
  cursor: pointer;
  :hover {
    color: #bdbdbd;
    background-color: #2e7d32;
  }
  @media (max-width: 800px) {
    margin: 2% 0 0 0;
  }
`;
export const LabelContainer = styled.label`
  font-size: 24px;
  margin: 10px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;
export const LoginButton = styled.button`
  font-size: 22px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  padding: 1%;
  border: 1px solid black;
  background: #4caf50;
  :hover {
    color: #bdbdbd;
    background-color: #2e7d32;
  }
`;
