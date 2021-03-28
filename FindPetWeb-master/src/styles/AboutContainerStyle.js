import styled from "styled-components";
export const Container = styled.div`
  width: 80%;
  margin: ${props => (props.mobile ? "10% auto 1% auto" : "1% auto 1% auto")};
  margin: ${props => props.mobile && props.user && "30% auto 1% auto"};
  background: white;
  font-size: 16px;
  padding: 1%;
`;
