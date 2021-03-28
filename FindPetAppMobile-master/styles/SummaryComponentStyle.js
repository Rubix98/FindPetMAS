import styled from 'styled-components'
export const Container = styled.View`
    flex:1;
`
export const AnimalImage = styled.Image`
    width: 160;
    height: 160;
`
export const ImagesContainer = styled.View`
    flexDirection: row;
    justifyContent: space-evenly;
    flexWrap:wrap;
    margin: 20px;
`
export const HeaderText = styled.Text`
    fontSize:18px;
    fontWeight:bold;
`
export const UserChoice = styled.Text`
    fontWeight:bold;    
`
export const Item = styled.Text`
    fontSize:15px;
`
export const NotifyContainer = styled.View`
  borderBottomWidth: 2;
  flexDirection: row;
  alignItems:center;
  justifyContent: center;
  paddingTop: 5;
  backgroundColor: #27ae60;
`
export const NotifyText = styled.Text`
  color:white;
`;

