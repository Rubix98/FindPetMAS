import React, { useState, useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { NewAppInfo } from "../../context/AppInfo";
import {
  HeaderText,
  MainContainer,
  ButtonsContainer,
  ChoiceButton,
} from "../../styles/GlobalLoginStyle";
import { Redirect } from "react-router";
const SelectLogin = (props) => {
  const [choice, setChoice] = useState();
  const userInfo = useContext(NewAppInfo);
  const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Heebo&display=swap');
  body{
    font-family: 'Ubuntu'
  }
`;

  return (
    <MainContainer>
      {userInfo.user && props.history.push("/findposts")}
      <HeaderText>Wybierz sposób logowania :</HeaderText>
      <ButtonsContainer>
        <ChoiceButton onClick={() => setChoice(0)}>
          Za pomocą unikalnego kodu
        </ChoiceButton>
        <ChoiceButton onClick={() => setChoice(1)}>
          Za pomocą loginu i hasła
        </ChoiceButton>
      </ButtonsContainer>
      {choice === 0 && <Redirect to="/logincode" />}
      {choice === 1 && <Redirect to="/logindata" />}
    </MainContainer>
  );
};
export default SelectLogin;
