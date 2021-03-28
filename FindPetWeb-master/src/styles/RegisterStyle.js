import styled from "styled-components";
export const Container = styled.div`
  width: 80%;
  @media (max-width: 800px) {
    width: 90%;
  }
  background: white;
  margin: 2% auto 0 auto;
  padding: 1%;
`;
export const PartComponent = styled.div`
  @media (min-width: 801px) {
    display: flex;
    justify-content: space-between;
  }
  display: block;
`;
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
export const LabelText = styled.div`
  display: flex;
  flex-direction: column;
`;
