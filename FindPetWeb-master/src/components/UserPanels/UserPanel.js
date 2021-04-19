import React, { useEffect, useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import {
  MainContainer,
  HeaderUserPanel,
  UserName,
  EditLink,
  UserInfo,
  UserInfoMain,
} from "../../styles/UserPanelStyle";
import "../../styles/UserMap.css";
import UserPosts from "./UserPosts";
const UserPanel = (props) => {
  const userInfo = useContext(NewAppInfo);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("Kliknij by wyświetlić twój unikalny kod");
  const [userPosts, setUserPosts] = useState(null);
  const [id, setId] = useState(null);

  const updateCode = () => {
    const resetButton = () => {
      setCode("Kliknij by wyświetlić twój unikalny kod");
    };
    setCode(userInfo.user.unikalny_kod);
    setTimeout(resetButton, 20000);
  };
  useEffect(() => {
    let tempId;
    if (props.location.params) {
      tempId = props.location.params.id;
    } else if (userInfo.user) {
      tempId = userInfo.user.idUżytkownik;
    }
    setId(tempId);
    const fetchData = async () => {
      await axios
        .get(userInfo.apiip + "/uzytkownicy/" + tempId)
        .then((res) => setUser(res.data[0]))
        .catch((err) => console.log(err));
      await axios
        .get(userInfo.apiip + "/postyuzytkownika/" + tempId)
        .then((res) => {
          setUserPosts(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [user, userInfo]);
  return (
    <div style={{ padding: "1%" }}>
      <MainContainer mobile={userInfo.mobileMenu}>
        {user && (
          <div>
            <HeaderUserPanel>
              Profil użytkownika :
              <UserName>
                {user.login || user.adres_mail || user.idUżytkownik}
              </UserName>
              <EditLink
                to={{
                  pathname: "/editprofile",
                  params: { id: userInfo.user.idUżytkownik || null },
                }}
                accept={userInfo.user.IdUzytkownik === user.IdUzytkownik}
              >
                Edytuj profil
              </EditLink>
            </HeaderUserPanel>
            <UserInfoContainer>
              <UserInfoMain>
                <p style={{ margin: 0 }}>id użytkownika: </p>
                <UserInfo>{user.idUżytkownik}</UserInfo>
              </UserInfoMain>
              <UserInfoMain>
                <p style={{ margin: 0 }}>adres e-mail:</p>
                <UserInfo>{user.adres_mail || "nie podano"}</UserInfo>
              </UserInfoMain>
              <UserInfoMain>
                <p style={{ margin: 0 }}>login:</p>
                <UserInfo>{user.login || "nie podano"}</UserInfo>
              </UserInfoMain>
              <UserInfoMain>
                <p style={{ margin: 0 }}>nr telefonu:</p>
                <UserInfo>{user.nr_telefonu || "nie podano"}</UserInfo>
              </UserInfoMain>
            </UserInfoContainer>
            <CodeButton
              onClick={() => {
                if (code == "Kliknij by wyświetlić twój unikalny kod") {
                  updateCode();
                }
              }}
              accept={userInfo.user.IdUzytkownik === user.IdUzytkownik}
            >
              {code}
            </CodeButton>
          </div>
        )}
      </MainContainer>
      <UserPosts posts={userPosts} />
    </div>
  );
};
export default UserPanel;
