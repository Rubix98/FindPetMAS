import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  HeaderText,
  HeaderValue,
  ImagesContainer,
  ImageContainer,
  Image,
  UserLink,
  UserActionsContainer,
  PostContainer,
  Icon,
} from "../../styles/AdminPanelStyle";
import axios from "axios";
import { circle } from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import { NewAppInfo } from "../../context/AppInfo";
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
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const AdminPanel = (props) => {
  const classes = useStyles();
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
  var moment = require("moment");
  const [posts, setPosts] = useState([]);
  const Map = ReactMapboxGl({
    accessToken: "*",
  });
  useEffect(() => {
    axios
      .get(`${userInfo.apiip}/postydozmoderowania`)
      .then((res) => {
        console.log(res);
        setPosts([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <HeaderText>Posty do zmoderowania:</HeaderText>

      {posts.map((post) => {
        return (
          <PostContainer>
            <div>
              <UserLink
                to={{
                  pathname: "/userpanel",
                  params: { id: post.idUżytkownik },
                }}
              >
                {post.login || post.adres_mail || post.idUżytkownik}
              </UserLink>
              <p style={{ margin: 0 }}>
                {moment(post.data_zgloszenia).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </div>
            <p>{post.tresc}</p>
            <HeaderValue>Zdjęcia:</HeaderValue>
            <ImagesContainer>
              {post.zdjecia.map((img) => {
                return (
                  <ImageContainer>
                    <Image src={`${userInfo.apiip}/` + img.zdjecie} />
                  </ImageContainer>
                );
              })}
            </ImagesContainer>
            <HeaderValue>Lokalizacja:</HeaderValue>
            <div>
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
                center={[
                  post.Dlugosc_Geograficzna,
                  post.Szerokosc_Geograficzna,
                ]}
                containerStyle={{ width: 300, height: 200, margin: "auto" }}
                onStyleLoad={(map, e) => {
                  handleMapLoaded(
                    map,
                    post.Dlugosc_Geograficzna,
                    post.Szerokosc_Geograficzna,
                    post.obszar ? post.obszar : 0
                  );
                }}
              />
            </div>
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
          </PostContainer>
        );
      })}
    </Container>
  );
};
export default AdminPanel;
