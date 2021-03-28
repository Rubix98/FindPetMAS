import styled from "styled-components";
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  width: 80%;
  padding: 1%;
  align-items: center;
  margin: 2% auto auto auto;
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
`;
export const LabelContainer = styled.label`
  display: flex;
  justify-content: space-between;
  @media (min-width: 1200px) {
    width: 800px;
    font-size: 20px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    width: 100%;
  }
  align-items: flex-start;
  margin: 10px;
`;
export const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 1200px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
  }
  font-size: 20px;
  align-items: center;
  margin: 10px;
`;
export const ImagesContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  @media (min-width: 1200px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    width: 100%;
    box-sizing: border-box;
  }
  margin-top: 100px;
`;
export const ImagesItem = styled.div`
  padding: 1px;
`;
export const HeaderText = styled.h1`
  font-size: 24px;
  color: #1b5e20;
  font-weight: initial;
  margin: 1% auto 1% auto;
`;
export const Image = styled.img`
  width: 180px;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 136px;
    box-sizing: border-box;
  }
`;
export const MapImage = styled.img`
  width: 15px;
`;
export const InvisibleInput = styled.input`
  display: none;
`;
export const SelectContainer = styled.select`
  font-size: 24px;
  border: 1px solid black;
  outline: none;
  @media (min-width: 1000px) {
    width: 310px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    width: 136px;
    box-sizing: border-box;
  }
  padding: 1px;
`;
export const ContentArea = styled.textarea`
  font-size: 16px;
  border: 1px solid black;
  outline: none;
  @media (min-width: 1000px) {
    width: 310px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    width: 136px;
    box-sizing: border-box;
  }
  padding: 1px;
`;
export const ContentText = styled.input`
  font-size: 24px;
  border: 1px solid black;
  @media (min-width: 1000px) {
    width: 310px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    width: 136px;
    box-sizing: border-box;
  }
  outline: none;
  padding: 1px;
`;
export const SendButton = styled.button`
  @media (min-width: 1000px) {
    width: 400px;
  }
  padding: 10px;
  font-size: 22px;
  border: 1px solid black;
  background: #50d752;
  font-weight: bold;
  cursor: pointer;
  margin: 1.5% 0 0 0;
  :hover {
    background: #43d034;
  }
`;
export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  font-weight: bold;
`;
