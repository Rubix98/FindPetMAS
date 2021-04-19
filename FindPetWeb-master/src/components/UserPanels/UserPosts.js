import React, { useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import axios from "axios";
import {
  HeaderNotice,
  HeaderTitle,
  LocationContainer,
  NoticeBoldItem,
  Img,
  ImageContainer,
  PostsContainer,
  CommentContainer,
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
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { circle } from "@turf/turf";
import "../../styles/UserMap.css";
import getCircle from "./getCircle";
import getSourceObject from "./getSourceObject";
import mapLayer from "./mapLayer";
import Comments from "./Comments";
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
      map.addLayer(getCircle(myCircle));
    }
    map.addSource("point", getSourceObject(lng, lat));
    map.addLayer(mapLayer);
    if (rad > 0) {
      map.addLayer(getCircle(circle));
    }
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
                    <Map
                      className="usermap"
                      style="mapbox://styles/mapbox/streets-v11"
                      onStyleLoad={(map, e) => {
                        handleMapLoaded(
                          map,
                          post.Dlugosc_geograficzna ||
                            post.Dlugosc_Geograficzna,
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
                      <Img
                        key={index}
                        src={userInfo.apiip + "/" + img.zdjecie}
                      />
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
};
export default UserPosts;
