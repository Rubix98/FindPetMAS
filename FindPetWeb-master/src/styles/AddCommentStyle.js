import styled from "styled-components";
export const FormContainer = styled.form`
  width: 80%;
  margin: 1% auto 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1%;
  text-align: center;
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
`;
export const ContentArea = styled.textarea`
  font-size: 16px;
  border: 1px solid black;
  outline: none;
  width: 80%;
  padding: 1px;
`;
export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1% auto 1% auto;
`;
export const ImageContainer = styled.div`
  width: 50%;
`;
export const Image = styled.img`
  width: 200px;
  cursor: pointer;
  margin: 1% auto 1% auto;
  @media (max-width: 800px) {
    width: 80px;
  }
`;
export const InvisibleInput = styled.input`
  display: none;
`;
export const SendButton = styled.button`
  @media (min-width: 800px) {
    width: 400px;
  }
  margin: 1% auto 1% auto;
  border: 1px solid black;
  font-size: 22px;
  cursor: pointer;
  background: #50d752;
`;
export const HeaderText = styled.h1`
  font-size: 16px;
  color: #1b5e20;
`;
