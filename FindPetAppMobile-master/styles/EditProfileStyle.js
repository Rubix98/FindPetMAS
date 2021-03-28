import styled from 'styled-components'
export const MainContainer = styled.View`
    padding:2px;
`
export const NotifyContainer = styled.View`
    borderBottomWidth:2;
    flexDirection:row;
    alignItems:center;
    justifyContent:space-around;
    paddingTop:5;
    backgroundColor:#27ae60;
`
export const NotifyText = styled.Text`
    fontSize:18;
    color:white;
`
export const InputText = styled.TextInput`
    fontSize:25;
    borderBottomColor:black;
    borderBottomWidth:2;
    marginBottom:30;
`
export const FormError = styled.Text`
    fontSize:14;
    color:red;
`
export const SendButton = styled.TouchableOpacity`
    backgroundColor:#77F868;
    padding:20px;
    alignItems:center;
`
export const SendButtonText = styled.Text`
    fontSize:20;
`