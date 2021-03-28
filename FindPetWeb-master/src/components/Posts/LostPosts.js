import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  SortPageButton,
  SortContainer,
  SortRow,
  SortLabel,
  SortLabelLocation,
  SortSelect,
  SortInput,
  SortButton,
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
  AddCommentContainer,
  AddCommentButton,
  TextArea,
  Comment,
  UserLink,
  PostLink,
  UserActionsContainer,
  Icon,
  PostImage,
} from "../../styles/LostPostsStyle";
import Image from "../../4.jpg";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import { NewAppInfo } from "../../context/AppInfo";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { circle } from "@turf/turf";
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from "mapbox-gl-draw-circle";
import { geolocated } from "react-geolocated";
import axios from "axios";
import { Link } from "react-router-dom";
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
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA",
});
const LostPosts = (props) => {
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
  const [location, setLocation] = useState([undefined, undefined]);
  const [openSort, setOpenSort] = useState(false);
  const [data, setData] = useState([]);
  const [sortTempValues, setSortTempValues] = useState({
    global: {},
    location: {},
  });
  const [sortValues, setSortValues] = useState({
    filtr_tresc: "%%",
    filtr_rasa: "%%",
    filtr_wielkosc: "%%",
    filtr_kolor_siersci: "%%",
    filtr_data_zaginiecia_zauwazenia_dol: "20100310 1920",
    filtr_data_zaginiecia_zauwazenia_gora: "20300319 1920",
  });
  const [allHairColour, setAllHairColour] = useState([]);
  const [allBreed, setAllBreed] = useState([]);
  const userInfo = useContext(NewAppInfo);
  const draw = new MapboxDraw({
    defaultMode: "draw_circle",
    userProperties: true,
    initialRadiusInKm: 0.1,
    modes: {
      ...MapboxDraw.modes,
      draw_circle: CircleMode,
      drag_circle: DragCircleMode,
      direct_select: DirectMode,
      simple_select: SimpleSelectMode,
    },
  });

  const handleMapLoaded = (map) => {
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
      }
    );
    const handleEvent = () => {
      let drawTemp = draw.getAll();
      /*
      console.log(drawTemp.features[0].properties.center[1]);
      console.log(drawTemp.features[0].properties.center[0]);
      console.log(drawTemp.features[0].properties.radiusInKm);
      let temp = userInfo.request;
      temp.latitude = drawTemp.features[0].properties.center[1];
      temp.longitude = drawTemp.features[0].properties.center[0];
      temp.radius = drawTemp.features[0].properties.radiusInKm;
      */
      setLocation([
        drawTemp.features[0].properties.center[0],
        drawTemp.features[0].properties.center[1],
      ]);
      let tempLocation = {};
      tempLocation.latitude = drawTemp.features[0].properties.center[0];
      tempLocation.longitude = drawTemp.features[0].properties.center[1];
      tempLocation.radius = drawTemp.features[0].properties.radiusInKm;
      let tempObj = sortTempValues;
      tempObj.location = tempLocation;
      setSortTempValues({ ...tempObj });
      if (map.getSource("point")) {
        map.getSource("point").setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  drawTemp.features[0].properties.center[0],
                  drawTemp.features[0].properties.center[1],
                ],
              },
            },
          ],
        });
      } else {
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
                  coordinates: [
                    drawTemp.features[0].properties.center[0],
                    drawTemp.features[0].properties.center[1],
                  ],
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
      }
    };
    map.on("draw.update", (e) => {
      handleEvent();
    });
    map.on("draw.modechange", (e) => {
      handleEvent();
    });

    map.addControl(draw);
    draw.changeMode("draw_circle", { initialRadiusInKm: 0.5 });
    // map.on("draw.update", e => {});
    console.log(draw.getAll());
    /*
    map.on("click", e => {
      console.log(e);
      setInfo({ a: "WWW" });
    });
  */
  };
  const handleLostMapLoaded = (map, lng, lat, rad) => {
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
  const handleSortTempValues = (e) => {
    let tempObj = { ...sortTempValues.global };
    let temp = { ...sortTempValues };
    tempObj[e.target.id] = e.target.value;
    temp.global = tempObj;
    setSortTempValues({ ...temp });
  };
  const handleSort = () => {
    let temp = { ...sortTempValues };
    let newTemp = {};
    newTemp.filtr_tresc = "%" + (temp.global.content || "") + "%";
    newTemp.filtr_rasa = "%" + (temp.global.breed || "") + "%";
    newTemp.filtr_wielkosc = "%" + (temp.global.size || "") + "%";
    newTemp.filtr_kolor_siersci = "%" + (temp.global.hairColour || "") + "%";
    newTemp.filtr_data_zaginiecia_zauwazenia_dol = moment(
      temp.global.lostDateDown || "2010-06-12T19:30"
    ).format("YYYYMMDD HHmmss");
    newTemp.filtr_data_zaginiecia_zauwazenia_gora = moment(
      temp.global.lostDateUp || "2030-06-12T19:30"
    ).format("YYYYMMDD HHmmss");
    newTemp.filtr_znaki_szczegolne =
      "%" + (temp.global.specialInfo || "") + "%";
    newTemp.latitude = temp.location.latitude;
    newTemp.longitude = temp.location.longitude;
    newTemp.radius = temp.location.radius;
    console.log(newTemp);
    console.log("|||||||||||");
    setSortValues({ ...newTemp });
  };
  useEffect(() => {
    if (props.coords) {
      setLocation([props.coords.longitude, props.coords.latitude]);
    }
    console.log("Witaj");
    const fetchData = async () => {
      console.log(sortValues);
      console.log("cccccccccccc");
      await axios
        .get(`${userInfo.apiip}/rasy`)
        .then((res) => {
          setAllBreed(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${userInfo.apiip}/siersc`)
        .then((res) => {
          setAllHairColour(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .post(`${userInfo.apiip}/postyzkomentarzami/0`, sortValues)
        .then((res) => {
          console.log(res.data);
          setData([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [props.coords, sortValues]);
  const tempLongitude = 53.015331;
  const tempLatitude = 18.6057;
  const tempRad = 0.01;
  let posts = data.map((date) => {
    return (
      <div style={{ margin: "8% 0 0 0", position: "relative" }}>
        <PostTextHeader>Zaginęło zwierzę!</PostTextHeader>
        <HeaderContainer>
          <PostInfoParagraph>
            <UserLink
              to={{
                pathname: "/userpanel",
                params: { id: date.idUżytkownik },
              }}
            >
              {date.login || date.adres_mail || date.idUżytkownik}
            </UserLink>
          </PostInfoParagraph>
          <PostInfoParagraph>
            {moment(date.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
          </PostInfoParagraph>
        </HeaderContainer>
        <p>{date.tresc}</p>
        <PostInfoContainer>
          <PostRow>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Typ zwierzęcia:</p>
              <p>{date.typ_zwierzecia || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Rasa:</p>
              <p>{date.rasa || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Wielkość:</p>
              {date.wielkosc || "nie określono"}
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Data zaginięcia:</p>
              <p>
                {date.data_time
                  ? moment(date.data_time).format("YYYY-MM-D HH:mm:ss")
                  : "nie określono"}
              </p>
            </PostInfoItem>
          </PostRow>
          <PostRow>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Kolor sierści:</p>
              <p>{date.kolor_siersci || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Znaki szczególne:</p>
              <p>{date.znaki_szczegolne || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Nagroda:</p>
              <p>{date.nagroda || "nie określono"}</p>
            </PostInfoItem>
          </PostRow>
        </PostInfoContainer>
        <TextPostMinHeader>Zdjęcia:</TextPostMinHeader>
        <ImagesContainer>
          {date.zdjecie.map((image) => {
            return (
              <PostImage
                src={`${userInfo.apiip}/` + image.zdjecie}
                style={{ width: 250 }}
              />
            );
          })}
          {/*}
          <img src={Image} style={{ width: 250 }} />
          <img src={Image} style={{ width: 250 }} />
          <img src={Image} style={{ width: 250 }} />
          {*/}
        </ImagesContainer>
        <TextPostMinHeader>Lokalizacja:</TextPostMinHeader>
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[date.Dlugosc_Geograficzna, date.Szerokosc_Geograficzna]}
          containerStyle={{ width: 300, height: 200, margin: "auto" }}
          onStyleLoad={(map, e) => {
            handleLostMapLoaded(
              map,
              date.Dlugosc_Geograficzna,
              date.Szerokosc_Geograficzna,
              date.obszar
            );
          }}
        />
        <CommentsContainer>
          {" "}
          {date.idUżytkownik == userInfo.user.idUżytkownik && (
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
                    params: { id: date.idPosty },
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
                      deletePost(date.idPosty);
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
          <HeaderCommentsText>Komentarze:</HeaderCommentsText>
          {date.komentarze.map((comment, index) => {
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
                  {/*}
            <img src={Image} style={{ width: 200 }} />
            <img src={Image} style={{ width: 200 }} />
            <img src={Image} style={{ width: 200 }} />
            <img src={Image} style={{ width: 200 }} />
          {*/}

                  <MapContainer>
                    <HeaderCommentsElements>
                      Lokalizacja:
                    </HeaderCommentsElements>
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
                params: { id: date.idPosty || null },
              }}
            >
              Zobacz wszystkie komentarze
            </PostLink>

            <PostLink
              to={{
                pathname: "/addcomment",
                params: { id: date.idPosty || null },
              }}
            >
              Dodaj komentarz
            </PostLink>
          </CommentContainer>
        </CommentsContainer>
      </div>
    );
  });
  return (
    <Container>
      <div>
        <SortPageButton
          onClick={() => {
            setOpenSort(!openSort);
          }}
        >
          Filtruj
        </SortPageButton>
        {openSort && (
          <SortContainer>
            <SortRow>
              <SortLabel for="breed">
                <p>Rasa:</p>
                <SortSelect
                  id="breed"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  {allBreed.map((breed) => {
                    return <option value={breed.rasa}>{breed.rasa}</option>;
                  })}
                </SortSelect>
              </SortLabel>
              <SortLabel for="hairColour">
                <p>Kolor sierści:</p>
                <SortSelect
                  id="hairColour"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  {allHairColour.map((hair) => {
                    return (
                      <option value={hair.kolor_siersci}>
                        {hair.kolor_siersci}
                      </option>
                    );
                  })}
                </SortSelect>
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabel for="specialInfo">
                <p>Znaki szczególne:</p>
                <SortInput
                  type="text"
                  id="specialInfo"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
              <SortLabel for="content">
                <p>Treść:</p>
                <SortInput
                  type="text"
                  id="content"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabel for="size">
                <p>Rozmiar:</p>
                <SortSelect
                  id="size"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  <option value="Mały">Mały</option>
                  <option value="Średni">Średni</option>
                  <option value="Duży">Duży</option>
                </SortSelect>
              </SortLabel>

              <SortLabel for="type">
                <p>Rodzaj zwierzęcia:</p>
                <SortSelect
                  id="type"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  <option value="Pies">Pies</option>
                  <option value="Kot">Kot</option>
                  <option value="Inne">Inne</option>
                </SortSelect>
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabel for="lostDate">
                <p>Data zauważenia(od):</p>
                <SortInput
                  type="datetime-local"
                  id="lostDateDown"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
              <SortLabel for="lostDate">
                <p>Data zauważenia(do):</p>
                <SortInput
                  type="datetime-local"
                  id="lostDateUp"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabelLocation for="location">
                <p>Lokalizacja:</p>
                {location[0] && (
                  <Map
                    style="mapbox://styles/mapbox/streets-v11"
                    center={[location[0], location[1]]}
                    containerStyle={{
                      width: "100%",
                      height: 150,
                    }}
                    onStyleLoad={(map, e) => {
                      handleMapLoaded(map);
                    }}
                  />
                )}
              </SortLabelLocation>
            </SortRow>
            <SortButton
              onClick={() => {
                handleSort();
              }}
            >
              Wyszukaj
            </SortButton>
          </SortContainer>
        )}
      </div>
      {posts}
    </Container>
  );
};

export default geolocated()(LostPosts);
