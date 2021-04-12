import React, { useState, useContext } from "react";
import moment from "moment";
import { NewAppInfo } from "../../context/AppInfo";
import locationPhoto from "../../91544.png";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import {
  MainContainer,
  InfoContainer,
  InfoRow,
  InfoItem,
  InfoHighlightItem,
  Image,
  ImageContainer,
  MapContainer,
  LocationHeaderText,
  SendButton,
} from "../../styles/SummaryStyle";
import { Redirect } from "react-router-dom";
import { MapIcon } from "../../styles/RequestSummary";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { circle } from "@turf/turf";
const Summary = (props) => {
  const draw = new MapboxDraw();
  // let tempArray = props.location.obj.images;
  console.log(props.location.obj);
  const userInfo = useContext(NewAppInfo);
  const [isReady, setReady] = useState(false);
  const sendFindRequest = async () => {
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/userpanel");
    };
    const data = new FormData();
    data.append("idUżytkownik", userInfo.user.idUżytkownik);
    data.append("tresc", userInfo.request.content || "");
    data.append("komentarz", "");
    data.append("typ_zgloszenia", userInfo.request.type);
    data.append("typ_zwierzecia", userInfo.request.animalType);
    data.append("rasa", userInfo.request.breed || "");
    data.append("wielkosc", userInfo.request.size || "");
    data.append("kolor_siersci", userInfo.request.hairColour || "");
    //data.append("nagroda", userInfo.request.prize);
    data.append(
      "data_zgloszenia",
      moment(new Date()).format("YYYY-MM-D HH:mm:ss")
    );
    data.append(
      "data_time",
      moment(userInfo.request.requestDate).format("YYYY-MM-D HH:mm:ss")
    );
    data.append("Szerokosc_Geograficzna", userInfo.request.latitude);
    data.append("Dlugosc_Geograficzna", userInfo.request.longitude);
    //data.append("obszar", userInfo.request.radius);
    //data.append("ilosc_zdjec", tempArray.length);
    data.append("znaki_szczegolne", userInfo.request.specialInfo);
    data.append("ilosc_zdjec", userInfo.request.images.length);
    for (var i = 0; i < userInfo.request.images.length; i++) {
      if (userInfo.request.images[i].size) {
        data.append("zdjecia", userInfo.request.images[i]);
      }
    }
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    userInfo.initNotify("Zgłoszenie w trakcie wysyłania.");
    fetch(userInfo.apiip + "/posty", config)
      .then((res) => {
        console.log(res);
        res.text().then((text) => {
          let json = JSON.parse(text);
          if (json.status === "success") {
            userInfo.initNotify("Dodano zgłoszenie");
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
  const sendLostRequest = async () => {
    const redirect = () => {
      userInfo.setRequest({});
      props.history.push("/userpanel");
    };
    const data = new FormData();
    data.append("idUżytkownik", userInfo.user.idUżytkownik);
    data.append("tresc", userInfo.request.content || "");
    data.append("komentarz", "");
    data.append("typ_zgloszenia", 0);
    data.append("ilosc_zdjec", userInfo.request.images.length);
    data.append("typ_zwierzecia", userInfo.request.animalType);
    data.append("rasa", userInfo.request.breed || "");
    data.append("wielkosc", userInfo.request.size || "");
    data.append("kolor_siersci", userInfo.request.hairColour || "");
    data.append("nagroda", userInfo.request.prize);
    data.append(
      "data_zgloszenia",
      moment(new Date()).format("YYYY-MM-D HH:mm:ss")
    );
    data.append(
      "data_time",
      moment(userInfo.request.requestDate).format("YYYY-MM-D HH:mm:ss")
    );
    data.append("Szerokosc_Geograficzna", userInfo.request.latitude);
    data.append("Dlugosc_Geograficzna", userInfo.request.longitude);
    data.append("obszar", userInfo.request.radius);
    //data.append("ilosc_zdjec", tempArray.length);
    data.append("znaki_szczegolne", userInfo.request.specialInfo);

    for (var i = 0; i < userInfo.request.images.length; i++) {
      if (userInfo.request.images[i].size) {
        data.append("zdjecia", userInfo.request.images[i]);
      }
    }
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    userInfo.initNotify("Zgłoszenie w trakcie wysyłania.");
    fetch(userInfo.apiip + "/posty", config)
      .then((res) => {
        console.log(res);
        res.text().then((text) => {
          let json = JSON.parse(text);
          if (json.status === "success") {
            userInfo.initNotify("Dodano zgłoszenie");
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
  const ReturnImages = (props) => {
    const result = props.images.map((img) => {
      let temp = URL.createObjectURL(img);
      return <Image src={temp} />;
    });
    return <ImageContainer>{result}</ImageContainer>;
  };
  const Map = ReactMapboxGl({
    accessToken: "*",
  });
  console.log(userInfo.sendDate);
  const handleLostMapLoaded = (map) => {
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
      }
    );
    var myCircle = circle(
      [userInfo.request.longitude, userInfo.request.latitude],
      userInfo.request.radius,
      { steps: 80, units: "kilometers" }
    );
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
                userInfo.request.longitude,
                userInfo.request.latitude,
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
  };
  const handleFindMapLoaded = (map) => {
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
      }
    );
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                userInfo.request.longitude,
                userInfo.request.latitude,
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
  };
  return (
    <div>
      {console.log("III")}
      {console.log(userInfo.request.type)}
      {isReady && <Redirect to="/selectlogin" />}
      {userInfo.request.content && (
        <MainContainer>
          {userInfo.request.type == 0 ? (
            <h1>Podsumowanie zgłoszenia zaginięcia zwierzęcia.</h1>
          ) : (
            <h1>Podsumowanie zgłoszenia zauważenia zwierzęcia</h1>
          )}
          <InfoContainer>
            <InfoRow>
              <InfoItem>Data dodania:</InfoItem>
              <InfoHighlightItem>
                {moment(new Date()).format("YYYY-MM-D HH:mm:ss")}
              </InfoHighlightItem>
            </InfoRow>
            {userInfo.request.type == 0 ? (
              <InfoRow>
                <InfoItem>Przybliżona data zaginięcia:</InfoItem>
                <InfoHighlightItem>
                  {moment(userInfo.request.requestDate).format(
                    "YYYY-MM-D HH:mm:ss"
                  )}
                </InfoHighlightItem>
              </InfoRow>
            ) : (
              <InfoRow>
                <InfoItem>Przybliżona data zauważenia:</InfoItem>
                <InfoHighlightItem>
                  {moment(userInfo.request.requestDate).format(
                    "YYYY-MM-D HH:mm:ss"
                  )}
                </InfoHighlightItem>
              </InfoRow>
            )}
            {userInfo.request.type === 0 && (
              <InfoRow>
                <InfoItem>Nagroda:</InfoItem>
                <InfoHighlightItem>{userInfo.request.prize}</InfoHighlightItem>
              </InfoRow>
            )}
            <InfoRow>
              <InfoItem>Typ zwierzęcia:</InfoItem>
              <InfoHighlightItem>
                {userInfo.request.animalType}
              </InfoHighlightItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>Treść zgłoszenia:</InfoItem>
              <InfoHighlightItem>{userInfo.request.content}</InfoHighlightItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>Rozmiar:</InfoItem>
              <InfoHighlightItem>
                {userInfo.request.size || "Nie określono"}
              </InfoHighlightItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>Kolor sierści:</InfoItem>
              <InfoHighlightItem>
                {userInfo.request.hairColour || "Nie określono"}
              </InfoHighlightItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>Dodatkowe informacje:</InfoItem>
              <InfoHighlightItem>
                {userInfo.request.specialInfo || "Nie określono"}
              </InfoHighlightItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>Rasa:</InfoItem>
              <InfoHighlightItem>
                {userInfo.request.breed || "Nie okreslono"}
              </InfoHighlightItem>
            </InfoRow>
            {userInfo.request.type != 0 && (
              <InfoRow>
                <InfoItem>Czy zabrano ze sobą:</InfoItem>
                <InfoHighlightItem>
                  {userInfo.request.took ? "tak" : "nie"}
                </InfoHighlightItem>
              </InfoRow>
            )}
          </InfoContainer>
          <LocationHeaderText>Zdjęcia:</LocationHeaderText>
          <ReturnImages images={userInfo.request.images} />
          <MapContainer>
            <LocationHeaderText>Lokalizacja:</LocationHeaderText>
            {userInfo.request.type == 0 ? (
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
                center={[userInfo.request.longitude, userInfo.request.latitude]}
                containerStyle={{ width: 500, height: 400, margin: "auto" }}
                onStyleLoad={(map, e) => {
                  handleLostMapLoaded(map);
                }}
              ></Map>
            ) : (
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
                center={[userInfo.request.longitude, userInfo.request.latitude]}
                containerStyle={{ width: 500, height: 400, margin: "auto" }}
                onStyleLoad={(map, e) => {
                  handleFindMapLoaded(map);
                }}
              ></Map>
            )}
          </MapContainer>
          {userInfo.request.type == 0 ? (
            <SendButton onClick={sendLostRequest}>Wyślij zgłoszenie</SendButton>
          ) : (
            <SendButton onClick={sendFindRequest}>Wyślij zgłoszenie</SendButton>
          )}
        </MainContainer>
      )}
    </div>
  );
};
export default Summary;
