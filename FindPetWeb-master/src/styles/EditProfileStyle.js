import styled from "styled-components";
export const FormContainer = styled.form`
  background: white;
  width: 80%;
  padding: 1%;
  margin: 1% auto 1% auto;
  @media (min-width: 801px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};

  @media (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const LabelContainer = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  width: 40%;
  @media (max-width: 800px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
export const ErrorText = styled.div`
  font-size: 10px;
  color: red;
  display: flex;
`;
export const InputText = styled.input`
  padding: 8px;
  font-size: 22px;
  border: 1px solid black;
  outline: none;
  @media (max-width: 800px) {
    font-size: 16px;
  }
`;
export const EditButton = styled.button`
  width: 400px;
  padding: 10px;
  font-size: 22px;
  border: 1px solid black;
  background: #50d752;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background: #43d034;
  }
`;
