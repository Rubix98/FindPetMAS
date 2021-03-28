import React, { useState, useContext } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import md5 from "md5";
import {
  MainContainer,
  LabelContainer,
  TextInput,
  LoginButton,
} from "../../styles/GlobalLoginStyle";
import { Redirect } from "react-router";
const LoginDataPanel = (props) => {
  const userInfo = useContext(NewAppInfo);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdate, setUpdate] = useState(false);
  const updateLogin = (event) => {
    setLogin(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const redirect = () => {
    setUpdate(true);
  };
  const loginRequest = () => {
    if (login !== "" && password !== "") {
      console.log(login + "," + md5(password));
      axios
        .post(userInfo.apiip + "/logowanie/", {
          login: login,
          haslo: md5(password),
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.status === "success") {
            await userInfo.login(res.data[0]);
            await userInfo.initNotify(
              "Logowanie zakończone pomyślnie. Twoje nowe id to :" +
                res.data[0].idUżytkownik
            );
            await setTimeout(redirect, 4000);
          } else {
            await userInfo.initNotify("Logowanie zakończone błędem !");
          }
        });
    } else {
      userInfo.initNotify("Wprowadzone dane wyglądają na niepoprawne.");
    }
  };
  return (
    <MainContainer>
      {isUpdate && <Redirect to="/userpanel" />}
      <LabelContainer>
        Podaj login:
        <TextInput type="text" onChange={updateLogin} />
      </LabelContainer>
      <LabelContainer>
        Podaj hasło
        <TextInput type="password" onChange={updatePassword} />
      </LabelContainer>
      <LoginButton onClick={() => loginRequest()}>Zaloguj się</LoginButton>
    </MainContainer>
  );
};
export default LoginDataPanel;
