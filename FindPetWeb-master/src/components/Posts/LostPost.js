import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NewAppInfo } from "../../context/AppInfo";
import {
  Container,
  HeaderText,
  UserLink,
  DateParagraph,
  OuterContainerInfo,
  InnerContainerInfo,
  InfoContainer,
  InInfoContainer,
  ValueParagraph,
  HeaderValues,
  OuterContainerImage,
  InnerContainerImage,
  Image,
  CommentContainer,
  HeaderComment,
  ImageComment,
  CommentInfo,
  AddCommentButton,
  HeaderContainer,
} from "../../styles/LostPostStyle";
import { UserActionsContainer, Icon } from "../../styles/LostPostsStyle";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import { circle } from "@turf/turf";
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
import { Link } from "react-router-dom";
import "../../styles/UserMap.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA",
});
const handleMapLoaded = (map, lng, lat, rad) => {
  console.log(lng);
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
const LostPost = (props) => {
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
  var moment = require("moment");
  const userInfo = useContext(NewAppInfo);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!props.history.location.params) {
      props.history.push("/");
    } else {
      const fetchData = async () => {
        await axios
          .get(`${userInfo.apiip}/posty/${props.history.location.params.id}`)
          .then((res) => {
            setData([...res.data]);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
          });
      };
      fetchData();
    }
  }, []);
  return (
    <Container mobile={userInfo.mobileMenu}>
      {data[0] && (
        <div style={{ position: "relative" }}>
          <HeaderText>
            {(data[0].typ_zgloszenia == 0 && "Zaginęło zwierzę!") ||
              (data[0].typ_zgloszenia == 1 && "Zauważono zwierzę!") ||
              (data[0].typ_zgloszenia == 2 && "Zabrano zwierzę!")}
          </HeaderText>
          <HeaderContainer>
            <UserLink
              to={{
                pathname: "/userpanel",
                params: { id: data[0].idUżytkownik },
              }}
            >
              {data[0].login || data[0].adres_mail || data[0].idUżytkownik}
            </UserLink>
            <DateParagraph>
              {moment(data[0].data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
            </DateParagraph>
          </HeaderContainer>
          <p>{data[0].tresc}</p>
          <OuterContainerInfo>
            <InnerContainerInfo>
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>Typ zwierzęcia:</ValueParagraph>
                  <p>{data[0].typ_zwierzecia}</p>
                </InInfoContainer>
              </InfoContainer>
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>Rasa:</ValueParagraph>
                  <p>{data[0].rasa}</p>
                </InInfoContainer>
              </InfoContainer>
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>Wielkość:</ValueParagraph>
                  <p>{data[0].wielkosc}</p>
                </InInfoContainer>
              </InfoContainer>
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>Kolor sierści:</ValueParagraph>
                  <p>{data[0].kolor_siersci}</p>
                </InInfoContainer>
              </InfoContainer>
            </InnerContainerInfo>
            <InnerContainerInfo>
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>Znaki Szczególne:</ValueParagraph>
                  <p>{data[0].znaki_szczegolne}</p>
                </InInfoContainer>
              </InfoContainer>
              {data[0].nagroda && (
                <InfoContainer>
                  <InInfoContainer>
                    <ValueParagraph>Nagroda:</ValueParagraph>
                    <p>{data[0].nagroda}</p>
                  </InInfoContainer>
                </InfoContainer>
              )}
              <InfoContainer>
                <InInfoContainer>
                  <ValueParagraph>
                    {data[0].typ == 0
                      ? "Ostatni raz widziano"
                      : "Data zauważenia"}
                  </ValueParagraph>
                  <p>
                    {moment(data[0].data_time).format("YYYY-MM-D HH:mm:ss")}
                  </p>
                </InInfoContainer>
              </InfoContainer>
            </InnerContainerInfo>
          </OuterContainerInfo>
          <div style={{ margin: "5% 0 0 0" }}>
            <HeaderValues>Lokalizacja:</HeaderValues>
            <Map
              className="usermap"
              style="mapbox://styles/mapbox/streets-v11"
              center={[
                data[0].Dlugosc_Geograficzna,
                data[0].Szerokosc_Geograficzna,
              ]}
              /*containerStyle={{ width: 300, height: 200, margin: "auto" }}*/
              onStyleLoad={(map, e) => {
                handleMapLoaded(
                  map,
                  data[0].Dlugosc_Geograficzna,
                  data[0].Szerokosc_Geograficzna,
                  data[0].obszar ? data[0].obszar : 0
                );
              }}
            />
          </div>
          <div style={{ margin: "5% 0 5% 0 " }}>
            <HeaderValues>Zdjęcia:</HeaderValues>
            <OuterContainerImage>
              <InnerContainerImage>
                {data[0].zdjecie.map((img) => {
                  return (
                    <div style={{ width: "50%" }}>
                      <Image src={`${userInfo.apiip}/` + img.zdjecie} />
                    </div>
                  );
                })}
              </InnerContainerImage>
            </OuterContainerImage>
          </div>
          {data[0].idUżytkownik == userInfo.user.idUżytkownik && (
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
                    params: { id: data[0].idPosty },
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
                      deletePost(data[0].idPosty);
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
          <HeaderValues>Komentarze:</HeaderValues>
          {data[0].komentarze.map((comment) => {
            return (
              <CommentContainer style={{ position: "relative" }}>
                <div style={{ margin: "3% 0 3% 0" }}>
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
                  <DateParagraph>
                    {moment(comment.data_zgloszenia).format(
                      "YYYY-MM-D HH:mm:ss"
                    )}
                  </DateParagraph>
                </div>
                <CommentInfo>
                  <ValueParagraph>
                    {comment.typ == 0
                      ? "Ostatni raz widziano"
                      : "Data zauważenia"}
                  </ValueParagraph>
                  <p>
                    {moment(comment.data_time).format("YYYY-MM-D HH:mm:ss")}
                  </p>
                </CommentInfo>
                <div style={{ margin: "3% 0 3% 0" }}>
                  <HeaderComment>Lokalizacja:</HeaderComment>
                  <Map
                    className="usermap"
                    style="mapbox://styles/mapbox/streets-v11"
                    center={[
                      comment.Dlugosc_Geograficzna,
                      comment.Szerokosc_Geograficzna,
                    ]}
                    /*containerStyle={{ width: 200, height: 150, margin: "auto" }}
                     */ onStyleLoad={(map, e) => {
                      handleMapLoaded(
                        map,
                        comment.Dlugosc_Geograficzna,
                        comment.Szerokosc_Geograficzna,
                        comment.obszar ? comment.obszar : 0
                      );
                    }}
                  />
                </div>
                <div style={{ margin: "3% 0 3% 0" }}>
                  <HeaderComment>Zdjęcia:</HeaderComment>
                  <OuterContainerImage>
                    <InnerContainerImage>
                      {data[0].zdjecie.map((img) => {
                        return (
                          <div style={{ width: "50%" }}>
                            <ImageComment
                              src={`${userInfo.apiip}/` + img.zdjecie}
                            />
                          </div>
                        );
                      })}
                    </InnerContainerImage>
                  </OuterContainerImage>
                </div>
                {comment.idUżytkownik == userInfo.user.idUżytkownik && (
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
                          params: { id: comment.idPosty },
                        }}
                      ></Link>
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
                          Czy chcesz usunąć komentarz ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Nie
                        </Button>
                        <Button
                          onClick={() => {
                            deletePost(comment.idPosty);
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
              </CommentContainer>
            );
          })}
        </div>
      )}
      <div
        style={{
          "text-align": "center",
          margin: "5% auto 0 15%",
        }}
      >
        <AddCommentButton
          to={{
            pathname: "/addcomment",
            params: { id: props.history.location.params.id || null },
          }}
        >
          Dodaj komentarz
        </AddCommentButton>
      </div>
    </Container>
  );
};
export default LostPost;
