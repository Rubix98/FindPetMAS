import React, { useContext, useState } from "react";
import md5 from "md5";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { NewAppInfo } from "../../context/AppInfo";
import { Formik, Form, Field } from "formik";
import {
  FormContainer,
  LabelContainer,
  ErrorText,
  InputText,
  EditButton,
} from "../../styles/EditProfileStyle";
import {
  Container,
  PartComponent,
  FlexContainer,
  LabelText,
} from "../../styles/RegisterStyle";
const RegisterPanel = (props) => {
  const [isReady, setReady] = useState(false);
  const userInfo = useContext(NewAppInfo);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const redirect = () => {
    setReady(true);
  };
  const sendRequest = (val) => {
    let type;
    let pass;
    if (val.login && val.password) {
      type = "Z";
    } else {
      type = "B";
    }
    if (val.password !== "" && val.password !== undefined) {
      pass = md5(val.password);
    } else {
      pass = "";
    }
    axios
      .post(userInfo.apiip + "/uzytkownicy", {
        idUżytkownik: "",
        adres_mail: val.email || "",
        login: val.login || "",
        haslo: pass || "",
        nr_telefonu: val.phone || "",
        typ: type,
        unikalny_kod: "",
      })
      .then((res) => {
        console.log(res);
        if (res.data[0]) {
          userInfo.initNotify("Zostałeś zarejestrowany ");
          setTimeout(redirect, 4000);
        } else {
          userInfo.initNotify("Wystąpił błąd podczas rejestracji");
        }
      })
      .catch((err) => {
        console.log(err);
        userInfo.initNotify("Wystąpił błąd podczas rejestracji");
      });
  };
  return (
    <Container>
      {isReady && <Redirect to="/userpanel" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
          repassword: "",
          login: "",
          phone: "",
        }}
        onSubmit={(values) => sendRequest(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          login: Yup.string().min(6).required(),
          password: Yup.string().min(6).required(),
          phone: Yup.string().min(9).matches(phoneRegExp).required(),
          repassword: Yup.string()
            .oneOf([Yup.ref("password"), null])
            .required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <FormContainer onSubmit={handleSubmit}>
            <FlexContainer>
              <PartComponent>
                <LabelContainer>
                  <LabelText>
                    <p>Podaj adres mail:</p>
                    {errors.email && (
                      <ErrorText>Niepoprawny adres e-mail</ErrorText>
                    )}
                  </LabelText>
                  <InputText
                    type="text"
                    onChange={handleChange("email")}
                    value={values.email}
                  />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>
                    <p>Podaj login:</p>
                    {errors.login && <ErrorText>Niepoprawny login</ErrorText>}
                  </LabelText>
                  <InputText
                    type="text"
                    onChange={handleChange("login")}
                    value={values.login}
                  />
                </LabelContainer>
              </PartComponent>
              <PartComponent>
                <LabelContainer>
                  <LabelText>
                    <p>Podaj hasło:</p>
                    {errors.password && (
                      <ErrorText>Niepoprawne hasło</ErrorText>
                    )}
                  </LabelText>
                  <InputText
                    type="password"
                    onChange={handleChange("password")}
                    value={values.password}
                  />
                </LabelContainer>
                <LabelContainer>
                  <LabelText>
                    <p>Powtórz hasło:</p>
                    {errors.repassword && (
                      <ErrorText>Hasła nie są takie same</ErrorText>
                    )}
                  </LabelText>
                  <InputText
                    type="password"
                    onChange={handleChange("repassword")}
                    value={values.repassword}
                  />
                </LabelContainer>
              </PartComponent>
              <PartComponent>
                <LabelContainer>
                  <LabelText>
                    <p>Podaj nr telefonu:</p>
                    {errors.phone && (
                      <ErrorText>Niepoprawny numer telefonu</ErrorText>
                    )}
                  </LabelText>
                  <InputText
                    type="text"
                    onChange={handleChange("phone")}
                    value={values.phone}
                  />
                </LabelContainer>
              </PartComponent>
            </FlexContainer>
            <EditButton type="submit" disabled={!isValid}>
              Zarejestruj się
            </EditButton>
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};
export default RegisterPanel;
