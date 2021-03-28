import React, { useState, useContext } from "react";
import {
  HeaderText,
  MainContainer,
  TextInput,
  ButtonLabel,
  FormButton,
} from "../../styles/GlobalLoginStyle";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { NewAppInfo } from "../../context/AppInfo";
//@import url('https://fonts.googleapis.com/css?family=Hind&display=swap');
const LoginCodePanel = (props) => {
  const userInfo = useContext(NewAppInfo);
  const [code, setCode] = useState("");
  const [move, setMove] = useState(false);
  const updateCode = (event) => {
    let text = event.target.value;
    setCode(text);
  };
  const updateMove = () => {
    setMove(1);
  };
  const loginRequest = () => {
    let temp = code.replace("/", "%2F");
    axios
      .get(userInfo.apiip + "/uzytkownikkod/" + temp)
      .then(async (res) => {
        if (res.data.length === 1) {
          await userInfo.login(res.data[0]);
          await userInfo.initNotify(
            "Logowanie zakończone pomyślnie. Twoje nowe id to :" +
              res.data[0].idUżytkownik
          );
          await setTimeout(updateMove, 4000);
        } else {
          await userInfo.initNotify("Logowanie zakończone błędem !");
        }
      })
      .catch((err) => {
        console.log(err);
        userInfo.initNotify("Logowanie zakończone błędem !");
      });
  };
  return (
    <MainContainer>
      <HeaderText>Wprowadź unikalny kod:</HeaderText>
      <div>
        <ButtonLabel>
          Kod:
          <TextInput spellcheck="false" onChange={updateCode} type="text" />
        </ButtonLabel>
        <FormButton onClick={loginRequest}>Zaloguj się</FormButton>
      </div>
      {move === 1 && <Redirect to="/about" />}
    </MainContainer>
  );
};
export default LoginCodePanel;
