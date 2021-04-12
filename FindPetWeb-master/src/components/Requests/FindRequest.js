import React, { useContext, useState, useEffect } from "react";
import md5 from "md5";
import * as Yup from "yup";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { NewAppInfo } from "../../context/AppInfo";
import { Formik, Form, Field } from "formik";
import DateTimePicker from "react-datetime-picker";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import photo from "../../photo.png";
import locationPhoto from "../../91544.png";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import {
  FormContainer,
  LabelContainer,
  BlockContainer,
  ImagesContainer,
  ImagesItem,
  HeaderText,
  Image,
  MapImage,
  InvisibleInput,
  SelectContainer,
  ContentArea,
  ContentText,
  SendButton,
  ErrorText,
} from "../../styles/LostRequestStyle";
import { createGlobalStyle } from "styled-components/macro";
import * as exifr from "exifr";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import circle from "@turf/circle";
import { geolocated } from "react-geolocated";

const Map = ReactMapboxGl({
  accessToken: "*",
});
const FindRequest = (props) => {
  const userInfo = useContext(NewAppInfo);
  console.log(props);
  const draw = new MapboxDraw();
  var moment = require("moment");
  //53.015331, 18.6057
  const [location, setLocation] = useState([undefined, undefined]);
  const [mapLocation, setMapLocation] = useState([undefined, undefined]);
  const [circle, setCircle] = useState(0.1);
  const [isReady, setIsReady] = useState(false);
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({});
  const [isSet, setSet] = useState(false);
  const [mapObj, setMapObj] = useState(false);
  console.log(data);
  var test;
  const handleLocationFromFile = (myMap, output) => {
    myMap.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        myMap.addImage("cat", image);
      }
    );

    if (myMap.getLayer("points")) {
      myMap.removeLayer("points");
    }
    if (myMap.getSource("point")) {
      myMap.removeSource("point");
    }
    if (output) {
      setLocation([...[output.longitude, output.latitude]]);
    }
    myMap.flyTo({
      center: [output.longitude, output.latitude],
    });
    if (myMap.getLayer("points")) {
      myMap.removeLayer("points");
    }

    myMap.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [output.longitude, output.latitude],
            },
          },
        ],
      },
    });

    mapObj.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "cat",
        "icon-size": 0.05,
      },
    });

    setLocation([...[output.longitude, output.latitude]]);
  };
  const handleMapLoaded = (map) => {
    console.log(test);
    if (props.coords) {
      map.once("render", () => {
        map.flyTo([props.coords.longitude, props.coords.latitude]);
      });
    } else {
      map.once("render", () => {
        map.flyTo([53.009619, 18.595374]);
      });
    }

    map.on("click", (e) => {
      console.log(e);
      if (!map.hasImage("image")) {
        map.loadImage(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
          function (error, image) {
            if (error) throw error;
            map.addImage("cat", image);
          }
        );
      }

      if (map.getLayer("points")) {
        map.removeLayer("points");
      }
      if (map.getSource("point")) {
        map.removeSource("point");
      }

      let temp = userInfo.request;
      temp.longitude = e.lngLat.lng;
      temp.latitude = e.lngLat.lat;
      setLocation([...[temp.longitude, temp.latitude]]);
      map.setCenter([temp.longitude, temp.latitude]);
      if (map.getLayer("points")) {
        map.removeLayer("points");
      }
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
                  coordinates: [temp.longitude, temp.latitude],
                },
              },
            ],
          },
        });
      }
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "cat",
          "icon-size": 0.05,
        },
      });
    });
  };

  const sendRequest = (e) => {
    let temp = userInfo.request;
    temp.took = e.took;
    if (!temp.took) {
      temp.type = 1;
    } else {
      temp.type = 2;
    }
    temp.breed = e.breed;
    temp.longitude = location[0];
    temp.latitude = location[1];
    //temp.location = location;
    temp.animalType = e.type;
    temp.userInfo = userInfo.user;
    temp.sendDate = moment();
    temp.requestDate = e.date;
    temp.images = files;
    temp.specialInfo = e.specialInfo;
    temp.prize = e.prize;
    temp.content = e.content;
    temp.size = e.size;
    temp.hairColour = e.hairColour;
    userInfo.setRequest(temp);
    const redirect = () => {
      props.history.push("/requestsummary");
    };
    setTimeout(redirect, 1000);
  };

  return (
    <div>
      <Formik
        initialValues={{
          date: "",
          took: false,
          type: "Pies",
          content: "",
          size: "Mały",
          hairColour: "",
          specialInfo: "",
          breed: "",
          prize: 0,
          image1: photo,
          image2: photo,
          image3: photo,
          image4: photo,
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
          <FormContainer onSubmit={handleSubmit} mobile={userInfo.mobileMenu}>
            <HeaderText>Zgłoś zauważenie zwierzęcia</HeaderText>
            <LabelContainer>
              Wybierz rodzaj zwierzęcia:
              <div>
                <SelectContainer
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e.target.value)}
                >
                  <option value="Pies">Pies</option>
                  <option value="Kot">Kot</option>
                  <option value="Inne">Inne</option>
                </SelectContainer>
              </div>
            </LabelContainer>
            <LabelContainer>
              <div>
                Podaj treść zgłoszenia:
                {errors.content ? (
                  <ErrorText>{errors.content}</ErrorText>
                ) : null}
              </div>
              <div>
                <ContentArea
                  value={values.content}
                  placeholder="Treść zgłoszenia"
                  onChange={(e) => setFieldValue("content", e.target.value)}
                />
              </div>
            </LabelContainer>
            <LabelContainer>
              Wybierz wielkość zwierzęcia:
              <div>
                <SelectContainer
                  value={values.size}
                  onChange={(e) => setFieldValue("size", e.target.value)}
                >
                  <option value="Mały">Mały</option>
                  <option value="Średni">Średni</option>
                  <option value="Duży">Duży</option>
                </SelectContainer>
              </div>
            </LabelContainer>
            <LabelContainer>
              <div>
                Podaj kolor sierści:
                {errors.hairColour ? (
                  <ErrorText>{errors.hairColour}</ErrorText>
                ) : null}
              </div>
              <div>
                <ContentText
                  value={values.hairColour}
                  type="text"
                  onChange={(e) => setFieldValue("hairColour", e.target.value)}
                />
              </div>
            </LabelContainer>
            <LabelContainer>
              <div>
                Podaj znaki szczególne:
                {errors.specialInfo ? (
                  <ErrorText>{errors.specialInfo}</ErrorText>
                ) : null}
              </div>
              <div>
                <ContentText
                  value={values.specialInfo}
                  onChange={(e) => setFieldValue("specialInfo", e.target.value)}
                  type="text"
                />
              </div>
            </LabelContainer>
            <LabelContainer>
              <div>
                Podaj rasę:
                {errors.breed ? <ErrorText>{errors.breed}</ErrorText> : null}
              </div>
              <div>
                <ContentText
                  value={values.breed}
                  type="text"
                  onChange={(e) => setFieldValue("breed", e.target.value)}
                />
              </div>
            </LabelContainer>
            <BlockContainer>
              <div>
                Podaj datę zauważenia:
                {errors.date ? <ErrorText>{errors.date}</ErrorText> : null}
              </div>
              <div>
                <DateTimePicker
                  onChange={(e) => setFieldValue("date", e)}
                  value={values.date}
                />
              </div>
            </BlockContainer>
            <HeaderText>Dodaj zdjęcia:</HeaderText>
            <ImagesContainer>
              <ImagesItem>
                <label for="file-input-1">
                  <Image src={values.image1} />
                </label>
                <InvisibleInput
                  id="file-input-1"
                  type="file"
                  onChange={async (e) => {
                    e.persist();
                    let temp = URL.createObjectURL(e.target.files[0]);
                    let tempArray = files;
                    tempArray[0] = e.target.files[0];
                    setSet(true);
                    await exifr.parse(temp).then((output) => {
                      if (output) handleLocationFromFile(mapObj, output);
                    });
                    console.log(e.target.files[0].lastModifiedDate);
                    await setFieldValue(
                      "date",
                      e.target.files[0].lastModifiedDate
                    );
                    setFiles([...tempArray]);
                    console.log(tempArray);
                    setFieldValue("image1", temp);
                  }}
                />
              </ImagesItem>
              <ImagesItem>
                <label for="file-input-2">
                  <Image src={values.image2} />
                </label>
                <InvisibleInput
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
              </ImagesItem>
              <ImagesItem>
                <label for="file-input-3">
                  <Image src={values.image3} />
                </label>
                <InvisibleInput
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
              </ImagesItem>
              <ImagesItem>
                <label for="file-input-4">
                  <Image src={values.image4} />
                </label>
                <InvisibleInput
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
              </ImagesItem>
            </ImagesContainer>
            <ImagesContainer>
              <HeaderText>
                Podaj lokalizację gdzie zauważyłeś zwierzę:
              </HeaderText>
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
                containerStyle={{ width: 500, height: 400, margin: "auto" }}
                onStyleLoad={(map, e) => {
                  setMapObj(map);
                  map.setCenter([18.595374, 53.010136]);
                  handleMapLoaded(map);
                }}
              ></Map>
            </ImagesContainer>

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

            <SendButton type="submit">Przejdź dalej</SendButton>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
};
export default geolocated()(FindRequest);
