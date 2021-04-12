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
import useGeolocation from "react-hook-geolocation";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
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
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from "mapbox-gl-draw-circle";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import circle from "@turf/circle";
import { geolocated } from "react-geolocated";
const GlobalStyling = createGlobalStyle`
    .react-datetime-picker__wrapper{
        width:310px;
    }
`;
const Map = ReactMapboxGl({
  accessToken: "*",
});
const LostRequest = (props) => {
  const userInfo = useContext(NewAppInfo);
  console.log(props);
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
  var moment = require("moment");
  //53.015331, 18.6057
  const [location, setLocation] = useState([18.598444, 53.01379]);

  const onGeolocationUpdate = (geolocation) => {
    if (geolocation.longitude) {
      setLocation([geolocation.longitude, geolocation.latitude]);
    }
  };
  const geolocation = useGeolocation({}, onGeolocationUpdate);

  const [circle, setCircle] = useState(0.1);
  const [isReady, setIsReady] = useState(false);
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({});

  console.log(data);

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
      console.log(drawTemp.features[0].properties.center[1]);
      console.log(drawTemp.features[0].properties.center[0]);
      console.log(drawTemp.features[0].properties.radiusInKm);
      let temp = userInfo.request;
      temp.latitude = drawTemp.features[0].properties.center[1];
      temp.longitude = drawTemp.features[0].properties.center[0];
      temp.radius = drawTemp.features[0].properties.radiusInKm;
      setLocation([
        drawTemp.features[0].properties.center[0],
        drawTemp.features[0].properties.center[1],
      ]);
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
  const sendRequest = (e) => {
    let temp = userInfo.request;
    temp.type = 0;
    temp.breed = e.breed;
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
  useEffect(() => {}, [location]);
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
            <HeaderText>Zgłoś zaginięcie zwierzęcia</HeaderText>
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
            <LabelContainer>
              <div>
                Podaj kwotę nagrody:
                {errors.prize ? <ErrorText>{errors.prize}</ErrorText> : null}
              </div>
              <div>
                <ContentText
                  value={values.prize}
                  type="text"
                  onChange={(e) => setFieldValue("prize", e.target.value)}
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
                Podaj lokalizację gdzie ostatni raz widziałeś zwierzę:
              </HeaderText>
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
                center={[location[0], location[1]]}
                containerStyle={{ width: 500, height: 400, margin: "auto" }}
                onStyleLoad={(map, e) => {
                  handleMapLoaded(map);
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
            </ImagesContainer>

            <SendButton type="submit">Przejdź dalej</SendButton>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
};
export default LostRequest;
