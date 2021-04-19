import React, { useState, useContext, useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import {
  PostTextHeader,
  PostInfoContainer,
  PostRow,
  PostInfoItem,
  ImagesContainer,
  TextPostMinHeader,
  HeaderCommentsText,
  HeaderContainer,
  CommentsContainer,
  MapContainer,
  HeaderCommentsElements,
  PostInfoParagraph,
  CommentContainer,
  Comment,
  UserLink,
  PostLink,
  UserActionsContainer,
  Icon,
  PostImage,
} from "../../styles/LostPostsStyle";
import { Link } from "react-router-dom";
import { NewAppInfo } from "../../context/AppInfo";
import DeleteIcon from "../../icons/bin_delete.svg";
import EditIcon from "../../icons/edit.svg";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Img from "react-image";
import { circle } from "@turf/turf";
import axios from "axios";
import "../../App.css";
import getLayerCircle from "./getLayerCircle";
import getSourceObject from "./getSourceObject";
import getLayerIndex from "./getLayerIndex";
const Map = ReactMapboxGl({
  accessToken: "*",
});
const handleLostMapLoaded = (map, lng, lat, rad, index) => {
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
    map.addLayer(getLayerCircle(myCircle));
  }
  map.addSource(`${index}point`, getSourceObject(lng, lat));
  map.addLayer(getLayerIndex(index));
  if (rad > 0) {
    map.addLayer(getLayerCircle(circle));
  }
};
const FindPost = (props) => {
  const [open, setOpen] = useState(false);
  const deletePost = (id) => {
    handleClose();
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/userpanel");
    };
    axios
      .delete(`${userInfo.apiip}/posty/${id}`)
      .then((res) => {
        if (res.status === 200) {
          userInfo.initNotify("Post usunięty pomyślnie");
          setTimeout(redirect, 4000);
        } else {
          userInfo.initNotify("Wystąpił błąd");
        }
      })
      .catch((err) => {
        userInfo.initNotify("Wystąpił błąd");
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userInfo = useContext(NewAppInfo);
  var moment = require("moment");
  const [location, setLocation] = useState([
    props.data.Dlugosc_Geograficzna,
    props.data.Szerokosc_Geograficzna,
  ]);
  return (
    <div style={{ margin: "8% 0 0 0", position: "relative" }}>
      <PostTextHeader>
        {props.data.typ_zgloszenia == 1
          ? "Zauważono zwierzę!"
          : "Zabrano zwierzę ze sobą!"}
      </PostTextHeader>
      <HeaderContainer>
        <PostInfoParagraph>
          <UserLink
            to={{
              pathname: "/userpanel",
              params: { id: props.data.idUżytkownik },
            }}
          >
            {props.data.login ||
              props.data.adres_mail ||
              props.data.idUżytkownik}
          </UserLink>
        </PostInfoParagraph>
        <PostInfoParagraph>
          {moment(props.data.data_zgloszneia).format("YYYY-MM-D HH:mm:ss")}
        </PostInfoParagraph>
      </HeaderContainer>
      <p>{props.data.tresc}</p>
      <PostInfoContainer>
        <PostRow>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Typ zwierzęcia:</p>
            <p>{props.data.typ_zwierzecia || "nie określono"}</p>
          </PostInfoItem>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Rasa:</p>
            <p>{props.data.rasa || "nie określono"}</p>
          </PostInfoItem>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Wielkość:</p>
            {props.data.wielkosc || "nie określono"}
          </PostInfoItem>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Data zaginięcia:</p>
            <p>
              {props.data.data_time
                ? moment(props.data.data_time).format("YYYY-MM-D HH:mm:ss")
                : "nie określono"}
            </p>
          </PostInfoItem>
        </PostRow>
        <PostRow>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Kolor sierści:</p>
            <p>{props.data.kolor_siersci || "nie określono"}</p>
          </PostInfoItem>
          <PostInfoItem>
            <p style={{ "font-weight": "bold" }}>Znaki szczególne:</p>
            <p>{props.data.znaki_szczegolne || "nie określono"}</p>
          </PostInfoItem>
        </PostRow>
      </PostInfoContainer>
      <TextPostMinHeader>Zdjęcia:</TextPostMinHeader>
      <ImagesContainer>
        {props.data.zdjecie.map((image) => {
          return (
            <Img
              src={`${userInfo.apiip}/` + image.zdjecie}
              style={{ width: 250 }}
            />
          );
        })}
      </ImagesContainer>
      <TextPostMinHeader>Lokalizacja:</TextPostMinHeader>
      <div id={`post${props.data.idPosty}`}>
        <Map
          className={`post${props.data.idPosty}`}
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[location[0], location[1]]}
          containerStyle={{ width: 300, height: 200, margin: "auto" }}
          onStyleLoad={(map, e) => {
            handleLostMapLoaded(
              map,
              location[0],
              location[1],
              0,
              props.data.idPosty
            );
          }}
        />
      </div>
      <CommentsContainer>
        <HeaderCommentsText>Komentarze:</HeaderCommentsText>
        {props.data.komentarze.map((comment, index) => {
          if (index < 2) {
            return (
              <Comment>
                <HeaderContainer>
                  <PostInfoParagraph>
                    <UserLink
                      to={{
                        pathname: "/userpanel",
                        params: { id: comment.idUżytkownik },
                      }}
                    >
                      {comment.login ||
                        comment.adres_mail ||
                        comment.idUżytkownik}
                    </UserLink>
                  </PostInfoParagraph>
                  <PostInfoParagraph>
                    {moment(comment.data_zgloszenia).format(
                      "YYYY-MM-D HH:mm:ss"
                    )}
                  </PostInfoParagraph>
                </HeaderContainer>
                <p>{comment.tresc}</p>
                <HeaderCommentsElements>Zdjęcia:</HeaderCommentsElements>
                <ImagesContainer>
                  {comment.zdjecie.map((image) => {
                    {
                      return (
                        <PostImage
                          src={`${userInfo.apiip}/` + image.zdjecie}
                          style={{ width: 200 }}
                        />
                      );
                    }
                  })}
                </ImagesContainer>

                <MapContainer>
                  <HeaderCommentsElements>Lokalizacja:</HeaderCommentsElements>
                  <Map
                    style="mapbox://styles/mapbox/streets-v11"
                    center={[
                      comment.Dlugosc_Geograficzna,
                      comment.Szerokosc_Geograficzna,
                    ]}
                    containerStyle={{
                      width: 200,
                      height: 150,
                      margin: "auto",
                    }}
                    onStyleLoad={(map, e) => {
                      handleLostMapLoaded(
                        map,
                        comment.Dlugosc_Geograficzna,
                        comment.Szerokosc_Geograficzna,
                        0
                      );
                    }}
                  />
                </MapContainer>
              </Comment>
            );
          }
        })}

        <CommentContainer>
          <PostLink
            to={{
              pathname: "/lostpost",
              params: { id: props.data.idPosty || null },
            }}
          >
            Zobacz wszystkie komentarze
          </PostLink>

          <PostLink
            to={{
              pathname: "/addcomment",
              params: { id: props.data.idPosty || null },
            }}
          >
            Dodaj komentarz
          </PostLink>
        </CommentContainer>
      </CommentsContainer>
      {props.data &&
        userInfo.user &&
        props.data.idUżytkownik == userInfo.user.idUżytkownik && (
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
                  params: { id: props.data.idPosty },
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
                    deletePost(props.data.idPosty);
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
    </div>
  );
};
export default FindPost;
