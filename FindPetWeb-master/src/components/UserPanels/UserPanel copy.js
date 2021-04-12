import React, { useEffect, useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import {
  MainContainer,
  HeaderUserPanel,
  UserName,
  EditButton,
  UserInfo,
  UserInfoMain,
} from "../../styles/UserPanelStyle";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
const UserPanel = (props) => {
  const userInfo = useContext(NewAppInfo);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("Kliknij by wyświetlić twój unikalny kod");
  const [userPosts, setUserPosts] = useState(null);
  let id;
  const Map = ReactMapboxGl({
    accessToken: "*",
  });
  if (userInfo.user) {
    id = userInfo.user.idUżytkownik;
  }
  if (props.location.params) {
    id = props.location.params.id;
  }
  const updateCode = () => {
    const resetButton = () => {
      setCode("Kliknij by wyświetlić twój unikalny kod");
    };
    setCode(userInfo.user.unikalny_kod);
    setTimeout(resetButton, 3000);
  };
  useEffect(() => {
    axios
      .get(userInfo.apiip + "/uzytkownicy/" + id)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log(err));
    axios
      .get(userInfo.apiip + "/postyuzytkownika/" + id)
      .then((res) => {
        setUserPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const UserPostsComponent = (props) => {
    const DisplayMap = (props) => {
      const [initialState, setInitialState] = useState({
        viewport: {
          latitude: props.latitude,
          longitude: props.longitude,
          zoom: 11,
        },
      });
      return (
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[8]}
          containerStyle={{
            height: "100%",
            width: "500px",
          }}
        ></Map>
      );
    };

    const postComponent = userPosts[props.no].map((post, index) => {
      let headerText;
      if (post.typ_zgloszenia === 0) {
        headerText = "Zaginął!";
      } else if (post.typ_zgloszenia === 1) {
        headerText = "Zauważono!";
      } else if (post.typ_zgloszenia === 2) {
        headerText = "Znaleziono oraz zabrano ze sobą!";
      }
      console.log(post);
      return (
        <DisplayMap
          key={{ index }}
          latitude={post.Szerokosc_geograficzna}
          longitude={post.Dlugosc_geograficzna}
        />
      );
    });
    return <span>{postComponent}</span>;
  };
  return (
    <MainContainer>
      {user && (
        <div>
          <HeaderUserPanel>
            Profil użytkownika :
            <UserName>
              {user.login || user.adres_mail || user.idUżytkownik}
            </UserName>
            <EditButton
              accept={user.idUżytkownik === userInfo.user.idUżytkownik}
            >
              Edytuj profil
            </EditButton>
          </HeaderUserPanel>
          <UserInfoMain>
            id użytkownika: <UserInfo>{user.idUżytkownik}</UserInfo>
          </UserInfoMain>
          <UserInfoMain>
            adres e-mail:
            <UserInfo>{user.adres_mail || "nie podano"}</UserInfo>
          </UserInfoMain>
          <UserInfoMain>
            login:
            <UserInfo>{user.login || "nie podano"}</UserInfo>
          </UserInfoMain>
          <UserInfoMain>
            nr telefonu:
            <UserInfo>{user.nr_telefonu || "nie podano"}</UserInfo>
          </UserInfoMain>
          <EditButton
            onClick={() => {
              updateCode();
            }}
            accept={user.idUżytkownik === userInfo.user.idUżytkownik}
          >
            {code}
          </EditButton>
          {console.log(userPosts)}
          <div>
            {userPosts && userPosts[0].length !== 0 && (
              <div>
                <span>Posty o zgubieniu zwierzęcia :</span>
                <UserPostsComponent no={0} key={0} />
              </div>
            )}
          </div>
          <div>
            {userPosts && userPosts[1].length !== 0 && (
              <div>
                <span>Posty o zgubieniu zwierzęcia :</span>
                <UserPostsComponent no={1} key={1} />
              </div>
            )}
          </div>
          <div>
            {userPosts && userPosts[2].length !== 0 && (
              <div>
                <span>Posty o zgubieniu zwierzęcia :</span>
                <UserPostsComponent no={2} key={2} />
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[8]}
          containerStyle={{
            height: "100%",
            width: "500px",
          }}
        ></Map>
      </div>
    </MainContainer>
  );
};
export default UserPanel;
