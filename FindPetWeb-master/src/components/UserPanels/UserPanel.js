import React, { useEffect, useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  MainContainer,
  HeaderUserPanel,
  UserName,
  EditLink,
  UserInfo,
  UserInfoMain,
  HeaderNotice,
  HeaderTitle,
  NoticeItem,
  LocationContainer,
  NoticeBoldItem,
  Img,
  ImageContainer,
  PostsContainer,
  CommentContainer,
  MainCommentContainer,
  CodeButton,
  LinkText,
  UserInfoContainer,
  MainContainerPosts,
  DateText,
  UserLink,
  BasicInfo,
  NoticeItemContainer,
  NoticeContainer,
  NoticeParagraph,
  UserActionsContainer,
  Icon,
  MobileContainer,
  PostLink,
  PostActionsContainer,
} from "../../styles/UserPanelStyle";
import moment from "moment";
import DeleteIcon from "../../icons/bin_delete.svg";
import EditIcon from "../../icons/edit.svg";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Link } from "react-router-dom";
import { circle } from "@turf/turf";
import "../../styles/UserMap.css";
const Map = ReactMapboxGl({
  accessToken: "*",
});
const Comments = (props) => {
  const handleMapLoaded = (map, lng, lat, rad) => {
    map.flyTo({ center: [lng, lat], zoom: 12 });
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
      }
    );
    if (rad > 0) {
      var myCircle = circle([lng, lat], rad, {
        steps: 80,
        units: "kilometers",
      });
      map.addLayer({
        id: "circle-fill",
        type: "fill",
        source: {
          type: "geojson",
          data: myCircle,
        },
        paint: {
          "fill-color": "#33691E",
          "fill-opacity": 0.5,
        },
      });
    }
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              //53.015331, 18.6057
              coordinates: [lng, lat],
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "cat",
        "icon-size": 0.05,
      },
    });
    if (rad > 0) {
      map.addLayer({
        id: "circle-outline",
        type: "line",
        source: {
          type: "geojson",
          data: circle,
        },
        paint: {
          "line-color": "#1B5E20",
          "line-opacity": 0.5,
          "line-width": 1,
          "line-offset": 5,
        },
        layout: {},
      });
    }
  };
  const userInfo = useContext(NewAppInfo);
  const commentsComponent = props.comments.map((comment, index) => {
    if (index < 2) {
      return (
        <MainCommentContainer>
          {userInfo.user == null && <Redirect to="/selectlogin" />}
          <MobileContainer>
            <UserLink
              to={{
                pathname: "/userpanel",
                params: { id: comment.idUżytkownik },
              }}
            >
              {comment.login || comment.adres_mail || comment.idUżytkownik}
            </UserLink>
            <DateText>
              {moment(comment.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
            </DateText>
          </MobileContainer>
          <span>{comment.tresc}</span>
          <BasicInfo>
            <NoticeContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>Data zaginiecia :</NoticeBoldItem>
                <NoticeParagraph>
                  {moment(comment.data_time).format("YYYY-MM-D HH:mm:ss")}
                </NoticeParagraph>
              </NoticeItemContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>typ zwierzecia :</NoticeBoldItem>
                <NoticeParagraph>
                  {comment.typ_zwierzecia || "nie określno"}
                </NoticeParagraph>
              </NoticeItemContainer>
            </NoticeContainer>
            <NoticeContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>rasa :</NoticeBoldItem>
                <NoticeParagraph>
                  {comment.rasa || "Nie określono"}
                </NoticeParagraph>
              </NoticeItemContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>wielkość :</NoticeBoldItem>
                <NoticeParagraph>
                  {comment.wielkosc || "Nie określono"}
                </NoticeParagraph>
              </NoticeItemContainer>
            </NoticeContainer>
            <NoticeContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>kolor sierści :</NoticeBoldItem>
                <NoticeParagraph>
                  {comment.kolor_siersci || "Nie określono"}
                </NoticeParagraph>
              </NoticeItemContainer>
              <NoticeItemContainer>
                <NoticeBoldItem>znaki szczególne :</NoticeBoldItem>
                <NoticeParagraph>
                  {comment.znaki_szczegolne || "Nie określono"}
                </NoticeParagraph>
              </NoticeItemContainer>
            </NoticeContainer>
          </BasicInfo>
          <LocationContainer>
            <NoticeBoldItem>Lokalizacja:</NoticeBoldItem>

            {comment.Szerokosc_geograficzna && comment.Dlugosc_geograficzna && (
              /*containerStyle={{ width: 300, height: 200, margin: "auto" }}*/
              <Map
                className="usermap"
                style="mapbox://styles/mapbox/streets-v11"
                onStyleLoad={(map, e) => {
                  handleMapLoaded(
                    map,
                    comment.Dlugosc_geograficzna ||
                      comment.Dlugosc_Geograficzna,
                    comment.Szerokosc_geograficzna ||
                      comment.Szerokosc_Geograficzna,
                    0
                  );
                }}
              />
            )}
          </LocationContainer>
          <NoticeBoldItem>Zdjęcia:</NoticeBoldItem>
          <ImageContainer>
            {comment.zdjecia.map((img, index) => {
              return (
                <Img key={index} src={userInfo.apiip + "/" + img.zdjecie} />
              );
            })}
          </ImageContainer>
        </MainCommentContainer>
      );
    }
  });
  return <div>{commentsComponent}</div>;
};
const UserPosts = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletePost = (id) => {
    handleClose();
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/userpanel");
    };
    axios
      .delete(`${userInfo.apiip}/posty/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          userInfo.initNotify("Post usunięty pomyślnie");
          setTimeout(redirect, 4000);
        } else {
          userInfo.initNotify("Wystąpił błąd");
        }
      })
      .catch((err) => {
        console.log(err);
        userInfo.initNotify("Wystąpił błąd");
      });
  };
  const handleMapLoaded = (map, lng, lat, rad) => {
    console.log(lng);
    map.flyTo({ center: [lng, lat], zoom: 12 });
    console.log(lat);
    console.log(rad);
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
      }
    );
    if (rad > 0) {
      var myCircle = circle([lng, lat], rad, {
        steps: 80,
        units: "kilometers",
      });
      map.addLayer({
        id: "circle-fill",
        type: "fill",
        source: {
          type: "geojson",
          data: myCircle,
        },
        paint: {
          "fill-color": "#33691E",
          "fill-opacity": 0.5,
        },
      });
    }
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              //53.015331, 18.6057
              coordinates: [lng, lat],
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "cat",
        "icon-size": 0.05,
      },
    });
    if (rad > 0) {
      map.addLayer({
        id: "circle-outline",
        type: "line",
        source: {
          type: "geojson",
          data: circle,
        },
        paint: {
          "line-color": "#1B5E20",
          "line-opacity": 0.5,
          "line-width": 1,
          "line-offset": 5,
        },
        layout: {},
      });
    }
  };
  const userInfo = useContext(NewAppInfo);
  var userPosts = props.posts;
  var postComponent = new Array(3);
  if (userPosts) {
    for (var i = 0; i < 3; i++) {
      if (userPosts[i].length > 0) {
        postComponent[i] = userPosts[i].map((post, index) => {
          var headerText;
          if (post.typ_zgloszenia == 0) {
            headerText = "Zaginął!";
          } else if (post.typ_zgloszenia == 1) {
            headerText = "Zauważono!";
          } else if (post.typ_zgloszenia == 2) {
            headerText = "Znaleziono oraz zabrano ze sobą!";
          }
          return (
            <PostsContainer style={{ position: "relative" }}>
              <HeaderTitle>{headerText}</HeaderTitle>
              <MobileContainer>
                <UserLink
                  to={{
                    pathname: "/userpanel",
                    params: { id: post.idUżytkownik },
                  }}
                >
                  {post.login || post.adres_mail || post.idUżytkownik}
                </UserLink>
                <DateText>
                  {moment(post.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
                </DateText>
              </MobileContainer>
              <span>{post.tresc}</span>
              <BasicInfo>
                <NoticeContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>Data zaginiecia :</NoticeBoldItem>
                    <NoticeParagraph>
                      {moment(post.data_time).format("YYYY-MM-D HH:mm:ss")}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>typ zwierzecia :</NoticeBoldItem>
                    <NoticeParagraph>
                      {post.typ_zwierzecia || "nie określono"}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                </NoticeContainer>
                <NoticeContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>rasa :</NoticeBoldItem>
                    <NoticeParagraph>
                      {post.rasa || "Nie określono"}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>wielkość :</NoticeBoldItem>
                    <NoticeParagraph>
                      {post.wielkosc || "Nie określono"}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                </NoticeContainer>
                <NoticeContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>kolor sierści :</NoticeBoldItem>
                    <NoticeParagraph>
                      {post.kolor_siersci || "Nie określono"}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                  <NoticeItemContainer>
                    <NoticeBoldItem>znaki szczególne :</NoticeBoldItem>
                    <NoticeParagraph>
                      {post.znaki_szczegolne || "Nie określono"}
                    </NoticeParagraph>
                  </NoticeItemContainer>
                </NoticeContainer>
              </BasicInfo>
              <LocationContainer>
                <NoticeBoldItem>Lokalizacja:</NoticeBoldItem>
                {post.Szerokosc_geograficzna && post.Dlugosc_geograficzna && (
                  /*
                  <DisplayMap
                    key={{ index }}
                    latitude={post.Szerokosc_geograficzna}
                    longitude={post.Dlugosc_geograficzna}
                  />
                  */
                  /*   containerStyle={{ width: 300, height: 200, margin: "auto" */
                  <Map
                    className="usermap"
                    style="mapbox://styles/mapbox/streets-v11"
                    onStyleLoad={(map, e) => {
                      handleMapLoaded(
                        map,
                        post.Dlugosc_geograficzna || post.Dlugosc_Geograficzna,
                        post.Szerokosc_geograficzna ||
                          post.Szerokosc_Geograficzna,
                        post.typ_zgloszenia == 0 ? post.obszar : 0
                      );
                    }}
                  />
                )}
              </LocationContainer>
              <NoticeBoldItem>Zdjęcia:</NoticeBoldItem>
              <ImageContainer>
                {post.zdjecia.map((img, index) => {
                  return (
                    <Img key={index} src={userInfo.apiip + "/" + img.zdjecie} />
                  );
                })}
              </ImageContainer>
              {post.komentarze.length > 0 && (
                <div>
                  <NoticeBoldItem>Komentarze:</NoticeBoldItem>
                  <CommentContainer>
                    <Comments comments={post.komentarze} />
                  </CommentContainer>
                </div>
              )}
              <PostActionsContainer>
                <PostLink
                  to={{
                    pathname: "/lostpost",
                    params: { id: post.idPosty || null },
                  }}
                >
                  Zobacz wszystkie komentarze
                </PostLink>

                <PostLink
                  to={{
                    pathname: "/addcomment",
                    params: { id: post.idPosty || null },
                  }}
                >
                  Dodaj komentarz
                </PostLink>
              </PostActionsContainer>
              {console.log(post.idUżytkownik)}
              {console.log(userInfo.user.idUżytkownik)}
              {post.idUżytkownik == userInfo.user.idUżytkownik && (
                <div>
                  <UserActionsContainer>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      <Icon src={DeleteIcon} />
                    </Button>

                    <Link
                      to={{
                        pathname: "/editpost",
                        params: { id: post.idPosty },
                      }}
                    >
                      <Button variant="outlined" color="primary">
                        <Icon src={EditIcon} />
                      </Button>
                    </Link>
                  </UserActionsContainer>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Usunięcie posta"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Czy chcesz usunąć post ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Nie
                      </Button>
                      <Button
                        onClick={() => {
                          deletePost(post.idPosty);
                        }}
                        color="primary"
                        autoFocus
                      >
                        Tak
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </PostsContainer>
          );
        });
      }
    }
  }
  return (
    <MainContainerPosts>
      {userPosts && userPosts[0].length > 0 && (
        <div>
          <HeaderNotice>Posty o zgubieniu zwierzęcia :</HeaderNotice>
          {postComponent[0]}
        </div>
      )}
      {userPosts && userPosts[1].length > 0 && (
        <div>
          <HeaderNotice>Posty o zauważeniu zwierzęcia :</HeaderNotice>
          {postComponent[1]}
        </div>
      )}
      {userPosts && userPosts[2].length > 0 && (
        <div>
          <HeaderNotice>Skomentowane posty :</HeaderNotice>
          {postComponent[2]}
        </div>
      )}
    </MainContainerPosts>
  );
};

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
