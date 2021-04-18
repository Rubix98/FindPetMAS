import React, { useState, useContext } from "react";
import { Formik } from "formik";
import DateTimePicker from "react-datetime-picker";
import * as exifr from "exifr";
import * as Yup from "yup";
import photo from "../../photo.png";
import { NewAppInfo } from "../../context/AppInfo";
import {
  FormContainer,
  ContentArea,
  ImagesContainer,
  ImageContainer,
  Image,
  InvisibleInput,
  SendButton,
  HeaderText,
} from "../../styles/AddCommentStyle";
import "../../styles/UserMap.css";
import getSourceData from "./getSourceData";
import getSource from "./getSource";
import mapLayer from "./mapLayer";

const AddComment = (props) => {
  const [files, setFiles] = useState([]);
  const userInfo = useContext(NewAppInfo);
  const [location, setLocation] = useState([undefined, undefined]);
  const [mapObj, setMapObj] = useState(false);
  var moment = require("moment");

  const handleMapLoaded = (map) => {
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
        map.getSource("point").setData(getSourceData(temp));
      } else {
        map.addSource("point", getSource(temp));
      }
      map.addLayer(mapLayer);
    });
  };
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
    setLocation([...[output.longitude, output.latitude]]);
    myMap.flyTo({
      center: [output.longitude, output.latitude],
    });
    if (myMap.getLayer("points")) {
      myMap.removeLayer("points");
    }

    myMap.addSource("point", getSource(output));

    mapObj.addLayer(mapLayer);

    setLocation([...[output.longitude, output.latitude]]);
  };
  const sendRequest = (e) => {
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/lostposts");
    };
    const data = new FormData();
    data.append("idUżytkownik", userInfo.user.idUżytkownik);
    data.append("tresc", e.content);
    data.append("komentarz", props.history.location.params.id);
    data.append("Szerokosc_Geograficzna", location[1]);
    data.append("Dlugosc_Geograficzna", location[0]);
    data.append("data_time", moment(e.date).format("YYYY-MM-D HH:mm:ss"));
    data.append(
      "data_zgloszenia",
      moment(new Date()).format("YYYY-MM-D HH:MM:SS")
    );
    data.append("ilosc_zdjec", files.length);
    for (var i = 0; i < files.length; i++) {
      if (files[i].size) {
        data.append("zdjecia", files[i]);
      }
    }
    console.log(data);
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    };
    fetch(userInfo.apiip + "/posty", config)
      .then((res) => {
        console.log(res);
        res.text().then((text) => {
          let json = JSON.parse(text);
          if (json.status === "success") {
            userInfo.initNotify("Dodano komentarz");
            userInfo.setRequest({});
            setTimeout(redirect, 3000);
          }
        });
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
        userInfo.initNotify("Wystąpił nieoczekiwany błąd !");
      });
  };

  return (
    <Formik
      initialValues={{
        date: "",
        content: "",
        image1: photo,
        image2: photo,
        image3: photo,
        image4: photo,
      }}
      onSubmit={(values) => sendRequest(values)}
      validationSchema={Yup.object().shape({
        date: Yup.date()
          .min(
            moment().subtract(1, "days").endOf("day").toString(),
            "Wprowadzona data jest nieprawidłowa!"
          )
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
          <label for="test">
            <HeaderText>Treść komentarza:</HeaderText>
            {errors.content ? (
              <p style={{ color: "red" }}>{errors.content}</p>
            ) : null}
            <ContentArea
              type="text"
              onChange={(e) => setFieldValue("content", e.target.value)}
            />
          </label>
          <div>
            <div>
              <HeaderText>Podaj datę zauważenia:</HeaderText>
              {errors.date ? <p>{errors.date}</p> : null}
            </div>
            <div style={{ width: "310px", margin: "1% auto 1% auto" }}>
              <DateTimePicker
                onChange={(e) => setFieldValue("date", e)}
                value={values.date}
              />
            </div>
          </div>
          <HeaderText>Dodaj zdjęcia:</HeaderText>
          <ImagesContainer>
            <ImageContainer>
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
                  await exifr.parse(temp).then((output) => {
                    handleLocationFromFile(mapObj, output);
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
            </ImageContainer>
            <ImageContainer>
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
            </ImageContainer>
            <ImageContainer>
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
            </ImageContainer>
            <ImageContainer>
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
            </ImageContainer>
          </ImagesContainer>
          <div>
            <HeaderText>Podaj lokalizację gdzie zauważyłeś zwierzę:</HeaderText>
            <Map
              style="mapbox://styles/mapbox/streets-v11"
              className="usermap"
              onStyleLoad={(map, e) => {
                setMapObj(map);
                map.setCenter([18.595374, 53.010136]);
                handleMapLoaded(map);
              }}
            ></Map>
          </div>
          <div class={{ "text-align": "center", margin: "5% auto auto 15%" }}>
            <SendButton type="submit">Dodaj komentarz</SendButton>
          </div>
        </FormContainer>
      )}
    </Formik>
  );
};
export default AddComment;
