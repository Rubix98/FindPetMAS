import React, { useEffect, useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import md5 from "md5";
import {
  FormContainer,
  LabelContainer,
  ErrorText,
  InputText,
  EditButton,
} from "../../styles/EditProfileStyle";
import { Redirect } from "react-router-dom";
const EditProfile = (props) => {
  console.log(props);
  const userInfo = useContext(NewAppInfo);
  const [user, setUser] = useState();
  const [isChange, setChange] = useState(false);
  console.log(userInfo);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const redirect = () => {
    setChange(true);
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
      .put(userInfo.apiip + "/uzytkownicy", {
        idUżytkownik: userInfo.user.idUżytkownik,
        adres_mail: val.email || "",
        login: val.login || "",
        haslo: pass,
        nr_telefonu: val.phone || "",
        typ: type,
        unikalny_kod: userInfo.user.unikalny_kod,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          userInfo.initNotify("Dane zostały zmienione pomyślnie");
          setTimeout(redirect, 4000);
        } else {
          userInfo.initNotify("Wystąpił błąd podczas edycji profilu");
        }
      })
      .catch((err) => {
        userInfo.initNotify("Wystąpił błąd podczas edycji profilu");
      });
  };
  console.log(userInfo);
  useEffect(() => {
    if (userInfo.user) {
      axios
        .get(userInfo.apiip + "/uzytkownicy/" + userInfo.user.idUżytkownik)
        .then((res) => {
          setUser(res.data[0]);
          console.log(res.data[0]);
        });
    }
  }, [userInfo]);
  console.log(userInfo);
  return (
    <div>
      {user === null && <Redirect to="/selectlogin" />}
      {isChange && <Redirect to="/selectlogin" />}
      {user && (
        <Formik
          initialValues={{
            email: user.adres_mail || "",
            password: "",
            login: user.login || "",
            phone: user.nr_telefonu || "",
          }}
          onSubmit={(values) => sendRequest(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email(),
            login: Yup.string().min(6),
            password: Yup.string().min(6),
            phone: Yup.string().min(9).matches(phoneRegExp),
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
            <FormContainer onSubmit={handleSubmit} mobile={userInfo.mobileMenu}>
              {console.log(user)}
              <LabelContainer>
                Podaj adres mail:
                <InputText
                  type="text"
                  onChange={handleChange("email")}
                  value={values.email}
                />
              </LabelContainer>
              {errors.email && <ErrorText>Niepoprawny adres e-mail</ErrorText>}
              <LabelContainer>
                Podaj login:
                <InputText
                  type="text"
                  onChange={handleChange("login")}
                  value={values.login}
                />
              </LabelContainer>
              {errors.login && <ErrorText>Niepoprawny login</ErrorText>}
              <LabelContainer>
                Podaj hasło:
                <InputText
                  type="password"
                  onChange={handleChange("password")}
                  value={values.password}
                />
              </LabelContainer>
              {errors.password && <ErrorText>Niepoprawne hasło</ErrorText>}
              <LabelContainer>
                Podaj nr telefonu:
                <InputText
                  type="text"
                  onChange={handleChange("phone")}
                  value={values.phone}
                />
              </LabelContainer>
              {errors.phone && <ErrorText>Niepoprawny telefon</ErrorText>}
              <EditButton disabled={!isValid} onPress={handleSubmit}>
                Edytuj profil
              </EditButton>
            </FormContainer>
          )}
        </Formik>
      )}
    </div>
  );
};
export default EditProfile;
