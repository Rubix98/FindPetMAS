import styled from "styled-components";
import Background from "../images/700.jpg";
export const Container = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0.6, 0.6) 100%
    ),
    url(${Background});
  background-attachment: fixed;
  background-position: center;
  padding-top: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @media (max-width: 1400px) {
    min-height: 68.5vh;
  }
  @media (min-width: 1401px) {
    min-height: 80.8vh;
  }
`;
