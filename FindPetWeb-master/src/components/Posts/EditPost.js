import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  HeaderText,
  HeaderValue,
  ErrorText,
  ContentArea,
  SelectContainer,
  ContentText,
  FormContainer,
  Image,
  ImagesContainer,
  ImageContainer,
  SubmitButton,
} from "../../styles/EditPostStyle";
import { NewAppInfo } from "../../context/AppInfo";
import { Formik, Form, Field } from "formik";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import photo from "../../photo.png";
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from "mapbox-gl-draw-circle";
import DateTimePicker from "react-datetime-picker";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as Yup from "yup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import circle from "@turf/circle";
import "../../styles/UserMap.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA",
});
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
const EditPost = (props) => {
  const [request, setRequest] = useState([]);
  const [myRadius, setMyRadius] = useState(0);
  var moment = require("moment");
  const handleMapLoaded = (map, lng, lat, rad, type) => {
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
    if (map.getSource("point")) {
      map.removeSource("point");
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
    const handleEvent = () => {
      let drawTemp = draw.getAll();

      map.flyTo([
        drawTemp.features[0].properties.center[1],
        drawTemp.features[0].properties.center[0],
      ]);
      let temp = userInfo.request;
      temp.latitude = drawTemp.features[0].properties.center[1];
      temp.longitude = drawTemp.features[0].properties.center[0];
      temp.radius = drawTemp.features[0].properties.radiusInKm;
      setLocation([
        drawTemp.features[0].properties.center[1],
        drawTemp.features[0].properties.center[0],
      ]);
      setMyRadius(temp.radius);
      userInfo.setRequest({ ...temp });
      if (map.getSource("point")) {
        map.getSource("point").setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [temp.longitude, temp.latitude],
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
                  coordinates: [temp.longitude, temp.latitude],
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
    if (type == 0) {
      map.addControl(draw);
      draw.changeMode("draw_circle", { initialRadiusInKm: 0.5 });
      // map.on("draw.update", e => {});
    } else {
      map.on("click", (e) => {
        handleClick(map, e.lngLat.lng, e.lngLat.lat);
      });
    }
  };
  const handleClick = (map, lng, lat) => {
    setLocation([lng, lat]);
    map.getSource("point").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      ],
    });
  };
  var blob = new Blob();

  const userInfo = useContext(NewAppInfo);
  const [location, setLocation] = useState([undefined, undefined]);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState([]);
  const sendRequest = (e) => {
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/userpanel");
    };
    const data = new FormData();
    data.append("id", props.history.location.params.id);
    data.append("idUżytkownik", userInfo.user.idUżytkownik);
    data.append("idZwierzecia", post[0].idZwierzecia);
    data.append("tresc", e.content || "");
    data.append("komentarz", "");
    if (e.request == 0) {
      data.append("typ_zgloszenia", 0);
    } else {
      data.append("ty_zgloszenia", e.took == false ? 1 : 2);
    }
    data.append("typ_zwierzecia", e.type);
    data.append("rasa", e.breed || "");
    data.append("wielkosc", e.size || "");
    data.append("kolor_siersci", e.hairColour || "");
    if (e.request == 0) {
      data.append("nagroda", e.prize);
      data.append("obszar", myRadius);
    }
    data.append(
      "data_zgloszenia",
      moment(new Date()).format("YYYY-MM-D HH:mm:ss")
    );
    data.append(
      "data_time",
      moment(e.requestDate).format("YYYY-MM-D HH:mm:ss")
    );
    data.append("Szerokosc_Geograficzna", location[0]);
    data.append("Dlugosc_Geograficzna", location[1]);
    //data.append("obszar", userInfo.request.radius);
    //data.append("ilosc_zdjec", tempArray.length);
    data.append("znaki_szczegolne", e.specialInfo);
    var tempLength = 0;
    for (var i = 0; i < files.length; i++) {
      if (files[i].size) {
        data.append("zdjecia", files[i]);
        tempLength++;
      }
    }
    data.append("ilosc_zdjec", tempLength);
    console.log(...data);

    const config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    userInfo.initNotify("Zgłoszenie w trakcie wysyłania.");
    fetch(userInfo.apiip + `/posty`, config)
      .then((res) => {
        console.log(res.status);

        if (res.status == 200) {
          userInfo.initNotify("Edytowano zgłoszenie");
          userInfo.setRequest({});
          setTimeout(redirect, 3000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
        userInfo.initNotify("Wystąpił nieoczekiwany błąd !");
      });
  };
  useEffect(() => {
    const getFile = async (path) => {
      let response = await fetch(path);
      let data = await response.blob();
      let metadata = {
        type: "image/jpeg",
      };
      let file = new File([data], "test.jpg", metadata);
      return file;
    };
    const fetchData = async () => {
      //props.hitory.location.params.id
      await axios
        .get(`${userInfo.apiip}/posty/` + props.history.location.params.id)
        .then((res) => {
          setPost([...res.data]);
          setLocation([
            res.data[0].Szerokosc_Geograficzna,
            res.data[0].Dlugosc_Geograficzna,
          ]);
          setMyRadius(res.data[0].obszar || 0);
          let temp = [photo, photo, photo, photo];

          const promises = res.data[0].zdjecie.map((img, index) => {
            let temp = getFile(`${userInfo.apiip}/${img.zdjecie}`).then(
              (res) => {
                return res;
              }
            );
            return temp;
          });
          Promise.all(promises).then((responses) => {
            const userFiles = responses.concat(temp.slice(responses.length));
            setFiles([...userFiles]);
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <Container mobile={userInfo.mobileMenu}>
      <HeaderText>Edycja posta:</HeaderText>
      {post[0] && (
        <Formik
          initialValues={{
            date: moment(post[0].data_time).format("YYYY-MM-D HH:mm:ss"),
            took: post[0].typ_zgloszenia == 2 ? true : false,
            type: post[0].typ_zwierzecia || "Pies",
            content: post[0].tresc || "",
            size: post[0].wielkosc || "",
            hairColour: post[0].kolor_siersci || "",
            specialInfo: post[0].znaki_szczegolne || "",
            breed: post[0].rasa || "",
            prize: post[0].nagroda || 0,
            image1: files[0],
            image2: files[1],
            image3: files[2],
            image4: files[3],
            request: post[0].typ_zgloszenia,
            idZwierzecia: post[0].idZwierzecia,
          }}
          onSubmit={(values) => sendRequest(values)}
          validationSchema={Yup.object().shape({
            date: Yup.date()
              .min("07/05/2012", "Wprowadzona data jest nieprawidłowa!")
              .max(moment().format(), "Wprowadzona data jest nieprawidłowa!!"),
            type: Yup.string(),
            content: Yup.string()
              .min(4, "Podana treść zgłoszenia jest za krótka!")
              .max(90, "Podana treść zgłoszenia jest za długa!"),
            size: Yup.string(),
            hairColour: Yup.string()
              .min(3, "Podana nazwa koloru jest za krótka!")
              .max(20, "Podana nazwa koloru jest za długa!"),
            specialInfo: Yup.string()
              .min(3, "Podana treść informacji jest za krótka!")
              .max(20, "Podana treść informacji jest za długa!"),
            breed: Yup.string()
              .min(3, "Nazwa rasy jest za krótka")
              .max(30, "Nazwa rasy jest za długa"),
            took: Yup.boolean(),
            image1: Yup.mixed(),
            image2: Yup.mixed(),
            image3: Yup.mixed(),
            image4: Yup.mixed(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            setFieldValue,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <FormContainer onSubmit={handleSubmit}>
              <label>
                Wybierz rodzaj zwierzęcia:
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <SelectContainer
                    value={values.type}
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    <option value="Pies">Pies</option>
                    <option value="Kot">Kot</option>
                    <option value="Inne">Inne</option>
                  </SelectContainer>
                </div>
              </label>
              <label>
                <div>
                  Podaj treść zgłoszenia:
                  {errors.content ? (
                    <ErrorText>{errors.content}</ErrorText>
                  ) : null}
                </div>
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <ContentArea
                    value={values.content}
                    placeholder="Treść zgłoszenia"
                    onChange={(e) => setFieldValue("content", e.target.value)}
                  />
                </div>
              </label>
              <label>
                Wybierz wielkość zwierzęcia:
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <SelectContainer
                    value={values.size}
                    onChange={(e) => setFieldValue("size", e.target.value)}
                  >
                    <option value="Mały">Mały</option>
                    <option value="Średni">Średni</option>
                    <option value="Duży">Duży</option>
                  </SelectContainer>
                </div>
              </label>
              <label>
                <div>
                  Podaj kolor sierści:
                  {errors.hairColour ? (
                    <ErrorText>{errors.hairColour}</ErrorText>
                  ) : null}
                </div>
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <ContentText
                    value={values.hairColour}
                    type="text"
                    onChange={(e) =>
                      setFieldValue("hairColour", e.target.value)
                    }
                  />
                </div>
              </label>
              <label>
                <div>
                  Podaj znaki szczególne:
                  {errors.specialInfo ? (
                    <ErrorText>{errors.specialInfo}</ErrorText>
                  ) : null}
                </div>
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <ContentText
                    value={values.specialInfo}
                    onChange={(e) =>
                      setFieldValue("specialInfo", e.target.value)
                    }
                    type="text"
                  />
                </div>
              </label>
              <label>
                <div>
                  Podaj rasę:
                  {errors.breed ? <ErrorText>{errors.breed}</ErrorText> : null}
                </div>
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <ContentText
                    value={values.breed}
                    type="text"
                    onChange={(e) => setFieldValue("breed", e.target.value)}
                  />
                </div>
              </label>
              {post[0].typ_zgloszenia == 0 && (
                <label>
                  <div>
                    Podaj kwotę nagrody:
                    {errors.prize ? (
                      <ErrorText>{errors.prize}</ErrorText>
                    ) : null}
                  </div>
                  <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                    <ContentText
                      value={values.prize}
                      type="text"
                      onChange={(e) => setFieldValue("prize", e.target.value)}
                    />
                  </div>
                </label>
              )}

              <div>
                <div>
                  Podaj datę zauważenia:
                  {errors.date ? <ErrorText>{errors.date}</ErrorText> : null}
                </div>
                <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
                  <DateTimePicker
                    onChange={(e) => setFieldValue("date", e)}
                    value={values.date}
                  />
                </div>
              </div>
              <HeaderValue>Dodaj zdjęcia:</HeaderValue>

              {files[0] && (
                <ImagesContainer>
                  <ImageContainer>
                    <label for="file-input-1">
                      <Image
                        src={
                          files[0].name
                            ? URL.createObjectURL(files[0])
                            : files[0]
                        }
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="file-input-1"
                      type="file"
                      onChange={async (e) => {
                        e.persist();
                        let temp = URL.createObjectURL(e.target.files[0]);
                        let tempArray = files;
                        tempArray[0] = e.target.files[0];
                        /*
                    await exifr.parse(temp).then(output => {
                      setLocation([output.latitude, output.longitude]);
                    });
                    */
                        await setFieldValue(
                          "date",
                          e.target.files[0].lastModifiedDate
                        );
                        setFiles([...tempArray]);
                        setFieldValue("image1", temp);
                      }}
                    />
                  </ImageContainer>
                  <ImageContainer>
                    <label for="file-input-2">
                      <Image
                        src={
                          files[1].name
                            ? URL.createObjectURL(files[1])
                            : files[1]
                        }
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="file-input-2"
                      type="file"
                      onChange={(e) => {
                        let temp = URL.createObjectURL(e.target.files[0]);
                        let tempArray = files;
                        tempArray[1] = e.target.files[0];
                        setFiles([...tempArray]);
                        setFieldValue("image2", temp);
                      }}
                    />
                  </ImageContainer>
                  <ImageContainer>
                    <label for="file-input-3">
                      <Image
                        src={
                          files[2].name
                            ? URL.createObjectURL(files[2])
                            : files[2]
                        }
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="file-input-3"
                      type="file"
                      onChange={(e) => {
                        let temp = URL.createObjectURL(e.target.files[0]);
                        let tempArray = files;
                        tempArray[2] = e.target.files[0];
                        setFiles([...tempArray]);
                        setFieldValue("image3", temp);
                      }}
                    />
                  </ImageContainer>
                  <ImageContainer>
                    <label for="file-input-4">
                      <Image
                        src={
                          files[3].name
                            ? URL.createObjectURL(files[3])
                            : files[3]
                        }
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="file-input-4"
                      type="file"
                      onChange={(e) => {
                        let temp = URL.createObjectURL(e.target.files[0]);
                        let tempArray = files;
                        tempArray[3] = e.target.files[0];
                        setFiles([...tempArray]);
                        setFieldValue("image4", temp);
                      }}
                    />
                  </ImageContainer>
                </ImagesContainer>
              )}

              <div>
                <HeaderValue>
                  Podaj lokalizację gdzie ostatni raz widziałeś zwierzę:
                </HeaderValue>
                {location[0] && (
                  <Map
                    style="mapbox://styles/mapbox/streets-v11"
                    /*containerStyle={{
                      height: "100vh",
                      width: "100vw"
                    }}*/
                    className="usermap"
                    center={[location[1], location[0]]}
                    /*containerStyle={{ width: 500, height: 400, margin: "auto" }}*/
                    onStyleLoad={(map, e) => {
                      handleMapLoaded(
                        map,
                        post[0].Dlugosc_Geograficzna,
                        post[0].Szerokosc_Geograficzna,
                        post[0].obszar ? post[0].obszar : 0,
                        post[0].typ_zgloszenia
                      );
                    }}
                  >
                    {/*}onClick={(map, evt) => {
                  setLocation([evt.lngLat.lat, evt.lngLat.lng]);
                }}{*/}
                    {/*}
                <Marker
                  coordinates={[
                    userCircle.longitude || 18.6057,
                    userCircle.latitude || 53.015331
                  ]}
                >
                  <MapImage src={locationPhoto} />
                </Marker>
              {*/}
                  </Map>
                )}
              </div>
              {post[0].typ_zgloszenia != 0 && (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          color: "#00e676",
                        }}
                        checked={values.took}
                        onChange={handleChange("took")}
                        value="took"
                      />
                    }
                    label="Czy zabrano?"
                  />
                </div>
              )}

              <SubmitButton type="submit">Przejdź dalej</SubmitButton>
            </FormContainer>
          )}
        </Formik>
      )}
    </Container>
  );
};
export default EditPost;
