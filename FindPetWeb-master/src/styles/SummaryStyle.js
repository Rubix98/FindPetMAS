import styled from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 80%;
  padding: 1%;
  align-items: center;
  margin: 2% auto auto auto;
`;
export const InfoContainer = styled.ol`
  display: flex;
  list-style-type: none;
  flex-direction: column;
  margin: 1% 0 0 2%;
`;
export const InfoRow = styled.ul`
  width: 100%;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  list-style-type: none;
  align-items: baseline;
`;
export const InfoItem = styled.li`
  margin: 2% 0 0 0;
`;
export const InfoHighlightItem = styled.li`
  color: #7cb342;
  width: 40%;
  font-weight: bold;
`;
export const Image = styled.img`
  width: 250px;
  margin: 1% 0 0 1%;
`;
export const ImageContainer = styled.div`
  width: 60%;
  margin: 3% 0 0 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const MapContainer = styled.div`
  margin: 2% 0 0 2%;
  text-align: center;
`;
export const LocationHeaderText = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
export const SendButton = styled.button`
  width: 400px;
  padding: 10px;
  font-size: 22px;
  margin: 2% 0 0 0;
  border: 1px solid black;
  background: #50d752;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background: #43d034;
  }
`;
