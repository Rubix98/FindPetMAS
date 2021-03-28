import styled from "styled-components";
export const Container = styled.div`
  background: white;
  width: 80%;
  margin: 1% auto 1% auto;
  margin: ${props => (props.mobile ? "32% auto 1% auto" : "1% auto 1% auto")};
`;
export const HeaderText = styled.h1`
  color: #1b5e20;
  font-size: 20px;
  margin: 0;
  padding: 0;
  text-align: center;
`;
export const HeaderValue = styled.h2`
  color: #1b5e20;
  font-size: 18px;
  margin: 0;
  padding: 0;
  text-align: center;
`;
export const ErrorText = styled.p`
  margin: 0;
  color: red;
`;
export const ContentArea = styled.textarea`
  font-size: 16px;
  border: 1px solid black;
  outline: none;
  width: 310px;
  padding: 1px;
`;
export const SelectContainer = styled.select`
  font-size: 24px;
  border: 1px solid black;
  outline: none;
  width: 310px;
  padding: 1px;
`;
export const ContentText = styled.input`
  font-size: 24px;
  border: 1px solid black;
  width: 310px;
  outline: none;
  padding: 1px;
`;
export const FormContainer = styled.form`
  text-align: center;
  padding: 1%;
  margin: 1% auto 1% auto;
`;
export const Image = styled.img`
  width: 200px;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 100px;
  }
`;
export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const ImageContainer = styled.div`
  width: 50%;
  margin: 1% auto 1% auto;
`;
export const SubmitButton = styled.button`
  border: 1px solid black;
  background: #50d752;
  padding: 1%;
  font-size: 16px;
  color: white;
  margin: 2%;
  outline: none;
  cursor: pointer;
`;
