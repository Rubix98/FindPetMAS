import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
const AppInfo = createContext();
const apiIp = "http://192.168.1.101:5100";
//const apiIp = "http://192.168.0.109:5100"
export const AppInfoProvider = props => {
  const { children } = props;
  const [notify, setNotify] = useState("");
  const [user, setUser] = useState(null);
  const [request, setRequest] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const login = async val => {
    await setUser(val);
    await localStorage.setItem("appUserInfo", JSON.stringify(val));
  };
  const logout = () => {
    setUser(null);
    localStorage.setItem("appUserInfo", null);
    return <Redirect to="/selectlogin" />;
  };
  const updateRequest = req => {
    setRequest(req);
  };
  const initNotify = text => {
    setNotify(text);
    setTimeout(resetNotify, 3000);
  };
  const resetNotify = () => {
    setNotify("");
  };
  const changeMobileMenu = () => {
    setMobileMenu(current => !current);
  };
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("appUserInfo"));
    setUser(temp);
  }, []);
  return (
    <AppInfo.Provider
      value={{
        user: user,
        notify: notify,
        initNotify: initNotify,
        request: request,
        setRequest: updateRequest,
        login: login,
        logout: logout,
        apiip: apiIp,
        mobileMenu: mobileMenu,
        changeMobileMenu: changeMobileMenu
      }}
    >
      {children}
    </AppInfo.Provider>
  );
};
export const AppInfoConsumer = AppInfo.Consumer;
export const NewAppInfo = AppInfo;
