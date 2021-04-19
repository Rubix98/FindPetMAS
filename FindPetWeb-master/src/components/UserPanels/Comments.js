import React, { useContext, useState } from "react";
import { NewAppInfo } from "../../context/AppInfo";
import { Redirect } from "react-router-dom";
import {
  LocationContainer,
  NoticeBoldItem,
  Img,
  ImageContainer,
  MainCommentContainer,
  DateText,
  UserLink,
  BasicInfo,
  NoticeItemContainer,
  NoticeContainer,
  NoticeParagraph,
  MobileContainer,
} from "../../styles/UserPanelStyle";
import moment from "moment";
import { circle } from "@turf/turf";
import "../../styles/UserMap.css";
import getCircle from "./getCircle";
import getSourceObject from "./getSourceObject";
import mapLayer from "./mapLayer";
import circleLayer from "./circleLayer";
const Comments = (props) => {
  const handleMapLoaded = (map, lng, lat, rad) => {
    map.flyTo({ center: [lng, lat], zoom: 12 });
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
      map.addLayer(getCircle(myCircle));
    }
    map.addSource("point", getSourceObject(lng, lat));
    map.addLayer(mapLayer);
    if (rad > 0) {
      map.addLayer(circleLayer);
    }
    const userInfo = useContext(NewAppInfo);
    const commentsComponent = props.comments.map((comment, index) => {
      if (index < 2) {
        return (
          <MainCommentContainer>
            {userInfo.user == null && <Redirect to="/selectlogin" />}
            <MobileContainer>
              <UserLink
                to={{
                  pathname: "/userpanel",
                  params: { id: comment.idUżytkownik },
                }}
              >
                {comment.login || comment.adres_mail || comment.idUżytkownik}
              </UserLink>
              <DateText>
                {moment(comment.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
              </DateText>
            </MobileContainer>
            <span>{comment.tresc}</span>
            <BasicInfo>
              <NoticeContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>Data zaginiecia :</NoticeBoldItem>
                  <NoticeParagraph>
                    {moment(comment.data_time).format("YYYY-MM-D HH:mm:ss")}
                  </NoticeParagraph>
                </NoticeItemContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>typ zwierzecia :</NoticeBoldItem>
                  <NoticeParagraph>
                    {comment.typ_zwierzecia || "nie określno"}
                  </NoticeParagraph>
                </NoticeItemContainer>
              </NoticeContainer>
              <NoticeContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>rasa :</NoticeBoldItem>
                  <NoticeParagraph>
                    {comment.rasa || "Nie określono"}
                  </NoticeParagraph>
                </NoticeItemContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>wielkość :</NoticeBoldItem>
                  <NoticeParagraph>
                    {comment.wielkosc || "Nie określono"}
                  </NoticeParagraph>
                </NoticeItemContainer>
              </NoticeContainer>
              <NoticeContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>kolor sierści :</NoticeBoldItem>
                  <NoticeParagraph>
                    {comment.kolor_siersci || "Nie określono"}
                  </NoticeParagraph>
                </NoticeItemContainer>
                <NoticeItemContainer>
                  <NoticeBoldItem>znaki szczególne :</NoticeBoldItem>
                  <NoticeParagraph>
                    {comment.znaki_szczegolne || "Nie określono"}
                  </NoticeParagraph>
                </NoticeItemContainer>
              </NoticeContainer>
            </BasicInfo>
            <LocationContainer>
              <NoticeBoldItem>Lokalizacja:</NoticeBoldItem>

              {comment.Szerokosc_geograficzna && comment.Dlugosc_geograficzna && (
                <Map
                  className="usermap"
                  style="mapbox://styles/mapbox/streets-v11"
                  onStyleLoad={(map, e) => {
                    handleMapLoaded(
                      map,
                      comment.Dlugosc_geograficzna ||
                        comment.Dlugosc_Geograficzna,
                      comment.Szerokosc_geograficzna ||
                        comment.Szerokosc_Geograficzna,
                      0
                    );
                  }}
                />
              )}
            </LocationContainer>
            <NoticeBoldItem>Zdjęcia:</NoticeBoldItem>
            <ImageContainer>
              {comment.zdjecia.map((img, index) => {
                return (
                  <Img key={index} src={userInfo.apiip + "/" + img.zdjecie} />
                );
              })}
            </ImageContainer>
          </MainCommentContainer>
        );
      }
    });
    return <div>{commentsComponent}</div>;
  };
};

export default Comments;
