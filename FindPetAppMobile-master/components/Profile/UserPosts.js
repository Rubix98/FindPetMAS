import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  InfoTextBold,
  HeaderInfoText,
  InfoText,
  LocationImagesContainer,
  Map,
  Img,
  PostsContainerInfo,
  PostInfo,
} from "../../styles/ProfileStyle";
import { UserPosts } from "./UserPosts";
const UserPosts = (props) => {
  var indexCounter = 0;

  const postsComponent = props.userPosts[props.no].map((post, index) => {
    let headerText;
    if (post.typ_zgloszenia == 0) {
      headerText = "Zaginął!";
    } else if (post.typ_zgloszenia == 1) {
      headerText = "Zauważono!";
    } else if (post.typ_zgloszenia == 2) {
      headerText = "Znaleziono oraz zabrano ze sobą!";
    }

    let route = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [
              post.Dlugosc_Geograficzna,
              post.Szerokosc_geograficzna,
            ],
          },
        },
      ],
    };
    let circles = {
      visibility: "visible",
      circleRadius: post.obszar || 0,
      circleColor: "#ff5722",
      circleStrokeColor: "#ff3d00",
      circleStrokeWidth: 5,
      circleOpacity: 0.7,
    };
    const [circle, setCircle] = useState(circles);
    const mapRef = useRef(null);
    const handleCircle = (r, post) => {
      console.log(post);
      const metersPerPixel = (lat, r) => {
        var earthCircumference = 40075017;
        var latitudeRadians = lat * (Math.PI / 180);
        return (
          (earthCircumference * Math.cos(latitudeRadians)) / Math.pow(2, r + 8)
        );
      };

      var pixelValue = function (post, zoomLevel) {
        return (
          (post.obszar * 1000) /
          metersPerPixel(post.Dlugosc_Geograficzna, zoomLevel)
        );
      };
      console.log(r + " " + post.Dlugosc_geograficzna + " " + post.obszar);
      console.log(metersPerPixel(post.Dlugosc_geograficzna, r));
      let newCircles = {
        visibility: "visible",
        circleRadius: pixelValue(post, r) || 0,
        circleColor: "#ff5722",
        circleStrokeColor: "#ff3d00",
        circleStrokeWidth: 5,
        circleOpacity: 0.7,
      };
      setCircle({ ...newCircles });
    };
    return (
      <PostsContainer key={++indexCounter}>
        <HeaderInfoText>{headerText}</HeaderInfoText>
        <InfoText>
          <InfoTextBold>
            {moment(post.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
          </InfoTextBold>
        </InfoText>
        <InfoText>
          <InfoTextBold
            style={{ color: "green" }}
            onPress={() => {
              props.navigation.navigate({
                routeName: "Profile",
                params: {
                  id: 10,
                },
                key: post.idUżytkownik,
              });
            }}
          >
            {post.login || post.adres_mail || post.idUżytkownik}
          </InfoTextBold>
        </InfoText>
        <InfoText>
          <InfoTextBold>{post.tresc}</InfoTextBold>
        </InfoText>
        <PostsContainerInfo>
          <PostInfo>
            <Text>Data zaginięcia:</Text>
            <InfoTextBold>
              {moment(post.data_time).format("YYYY-MM-D HH:mm:ss")}
            </InfoTextBold>
          </PostInfo>
          <PostInfo>
            <Text>typ zwierzęcia:</Text>
            <InfoTextBold>
              {post.typ_zwierzecia || "nie określono"}
            </InfoTextBold>
          </PostInfo>
          <PostInfo>
            <Text>rasa:</Text>
            <InfoTextBold>{post.rasa || "Nie określonno"}</InfoTextBold>
          </PostInfo>
          <PostInfo>
            <Text>wielkość:</Text>
            <InfoTextBold>{post.wielkosc || "nie określono"}</InfoTextBold>
          </PostInfo>
          <PostInfo>
            <Text>kolor sierśći:</Text>
            <InfoTextBold>{post.kolor_siersci || "nie określono"}</InfoTextBold>
          </PostInfo>
          <PostInfo>
            <Text>znaki szczególne:</Text>
            <InfoTextBold>
              {post.znaki_szczegolne || "nie określono"}
            </InfoTextBold>
          </PostInfo>
        </PostsContainerInfo>
        <LocationImagesContainer>
          {circle && (
            <Map
              onPress={({ geometry }) => {
                console.log(geometry.coordinate);
              }}
              ref={mapRef}
              onDidFinishLoadingStyle={() => {
                mapRef.current.getZoom().then((r) => handleCircle(r, post));
              }}
              onRegionDidChange={() => {
                mapRef.current.getZoom().then((r) => handleCircle(r, post));
              }}
            >
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[
                  post.Dlugosc_geograficzna,
                  post.Szerokosc_geograficzna,
                ]}
              />
              <MapboxGL.ShapeSource id="line1" shape={route}>
                <MapboxGL.CircleLayer
                  circleRadius={post.obszar || 0}
                  //id="population"
                  id="sf2010CircleFill"
                  //sourceLayerID="sf2010"
                  style={circle}
                />
              </MapboxGL.ShapeSource>
              <MapboxGL.PointAnnotation
                key="punkt"
                id="punkt"
                title="Test"
                coordinate={[
                  post.Dlugosc_Geograficzna,
                  post.Szerokosc_geograficzna,
                ]}
              />
            </Map>
          )}

          {post.zdjecia.map((img) => {
            return (
              <Img
                key={++indexCounter}
                source={{ uri: userInfo.apiip + "/" + img.zdjecie }}
              />
            );
          })}
        </LocationImagesContainer>
        <InfoTextBold>Komentarze : </InfoTextBold>
        <UserLostsComments key={++indexCounter} id={index} post={props.no} />
        <UserActions
          onPress={() => {
            props.navigation.navigate("AddComment", { id: post.idPosty });
          }}
        >
          <Text>Dodaj komentarz</Text>
        </UserActions>
        <UserActions
          onPress={() => {
            props.navigation.navigate("Post", { id: post.idPosty });
          }}
        >
          <Text>Zobacz wszystkie komentarze</Text>
        </UserActions>
      </PostsContainer>
    );
  });

  return <View>{postsComponent}</View>;
};
export default UserPosts;
