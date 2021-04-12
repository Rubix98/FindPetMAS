/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import axios from 'axios';
import moment from 'moment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  MainContainer,
  HeaderText,
  PostContainer,
  Item,
  ItemAtribute,
  UserLink,
  InformationList,
  InformationAtribute,
  InformationValue,
  SectionContainer,
  ImagesContainer,
  Img,
  CommentContainer,
  LocationCommentContainer,
  MapViewer,
  UserActions,
} from '../../styles/PostsStyle';
const Post = props => {

  MapboxGL.setAccessToken(
    '*',
  );
  const userInfo = useContext(NewAppInfo);
  const [posts, setPosts] = useState([]);
  const [allBreeds, setBreeds] = useState([]);
  const [startIsVisible, setStartIsVisible] = useState(false);
  const useForceUpdate = () => useState()[1];

  const changeVisible_start = () => {
    setStartIsVisible(!startIsVisible);
  };
  const confirm_end = date => {
    changeVisible_end();
    let temp = moment(date).format('YYMMD HHmmss');
    setFilterNoticeDateEnd(temp);
  };

  const changeVisible_end = () => {
    setEndIsVisible(!startIsVisible);
  };

  const PostComponent = props => {
    let route = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [
              props.post.Dlugosc_Geograficzna,
              props.post.Szerokosc_Geograficzna,
            ],
          },
        },
      ],
    };
    let circles = {
      visibility: 'visible',
      circleRadius: props.post.obszar || 0,
      circleColor: '#ff5722',
      circleStrokeColor: '#ff3d00',
      circleStrokeWidth: 5,
      circleOpacity: 0.7,
    };
    const [circle, setCircle] = useState(circles);
    const mapRef = useRef(null);
    const handleCircle = (r, post) => {
      const metersPerPixel = (lat, r) => {
        var earthCircumference = 40075017;
        var latitudeRadians = lat * (Math.PI / 180);
        return (
          (earthCircumference * Math.cos(latitudeRadians)) / Math.pow(2, r + 8)
        );
      };

      const pixelValue = (post, zoomLevel) => {
        return (
          (post.obszar * 1000) /
          metersPerPixel(post.Dlugosc_Geograficzna, zoomLevel)
        );
      };
      let newCircles = {
        visibility: 'visible',
        circleRadius: pixelValue(post, r) || 0,
        circleColor: '#ff5722',
        circleStrokeColor: '#ff3d00',
        circleStrokeWidth: 5,
        circleOpacity: 0.7,
      };
      setCircle({...newCircles});
    };
    return (
      <PostContainer>
        <View>
          <View>
            <UserLink
              style={{color: 'green'}}
                onPress={() => {
                  props.navigate.navigate('Posts', {
                    id: props.post.idPosty,
                  })}}
                >
                  Edytuj
              </UserLink>
          </View>
          {props.no == 0 && <HeaderText>Zaginął!</HeaderText>}
          {props.post.typ_zgloszenia === 1 && (
            <HeaderText>Zauważyłem!</HeaderText>
          )}
          {props.post.typ_zgloszenia === 2 && (
            <HeaderText>Znaleziono oraz zabrano ze sobą!</HeaderText>
          )}

          <Item>
            <UserLink
              style={{color: 'green'}}
              onPress={() => {
                props.navigate.navigate('Profile', {
                  id: props.post.idUżytkownik,
                });
              }}>
              {props.post.login ||
                props.post.adres_mail ||
                props.post.idUżytkownik}
            </UserLink>
          </Item>
          <View>
            {props.post.data_zgloszenia && (
              <View>
                <Item>
                  {moment(props.post.data_zgloszenia).format('D-MM-YYYY HH:mm:ss')}
                </Item>
              </View>
            )}
            <ItemAtribute>{props.post.tresc || 'Nie podano'}</ItemAtribute>
          </View>

          <InformationList>
            {props.post.data_time && (
              <View
                style={{
                  width: '45%',
                  backgroundColor: '#27ae60',
                  margin: '1%',
                }}>
                <InformationAtribute style={{textAlign: 'center'}}>
                  Data zauważenia:
                </InformationAtribute>
                <InformationValue style={{textAlign: 'center'}}>
                  {moment(props.post.data_time).format(
                    'D-MM-YYYY HH:mm:ss',
                  )}
                </InformationValue>
              </View>
            )}
            <View
              style={{width: '45%', backgroundColor: '#27ae60', margin: '1%'}}>
              <InformationAtribute style={{textAlign: 'center'}}>
                Rasa:
              </InformationAtribute>
              <InformationValue>
                {props.post.rasa || 'Nie podano'}
              </InformationValue>
            </View>
            <View
              style={{width: '45%', backgroundColor: '#27ae60', margin: '1%'}}>
              <InformationAtribute style={{textAlign: 'center'}}>
                Wielkość:
              </InformationAtribute>
              <InformationValue style={{textAlign: 'center'}}>
                {props.post.wielkosc || 'Nie podano'}
              </InformationValue>
            </View>
            <View
              style={{width: '45%', backgroundColor: '#27ae60', margin: '1%'}}>
              <InformationAtribute style={{textAlign: 'center'}}>
                Kolor sierści:
              </InformationAtribute>
              <InformationValue style={{textAlign: 'center'}}>
                {props.post.kolor_siersci || 'Nie podano'}
              </InformationValue>
            </View>
            <View
              style={{width: '45%', backgroundColor: '#27ae60', margin: '1%'}}>
              <InformationAtribute style={{textAlign: 'center'}}>
                Znaki szczególne:
              </InformationAtribute>
              <InformationValue style={{textAlign: 'center'}}>
                {props.post.znaki_szczegolne || 'Nie podano'}
              </InformationValue>
            </View>
          </InformationList>
          <SectionContainer>
            <InformationAtribute>Lokalizacja:</InformationAtribute>
            {props.post.Szerokosc_Geograficzna &&
              props.post.Dlugosc_Geograficzna && (
                <MapViewer
                  ref={mapRef}
                  onDidFinishLoadingStyle={() => {
                    mapRef.current
                      .getZoom()
                      .then(r => handleCircle(r, props.post));
                  }}
                  onRegionDidChange={() => {
                    mapRef.current
                      .getZoom()
                      .then(r => handleCircle(r, props.post));
                  }}>
                  <MapboxGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[
                      props.post.Dlugosc_Geograficzna,
                      props.post.Szerokosc_Geograficzna,
                    ]}
                  />
                  {props.post.obszar && (
                    <MapboxGL.ShapeSource id="line1" shape={route}>
                      <MapboxGL.CircleLayer
                        circleRadius={60}
                        id="sf2010CircleFill"
                        style={circle}
                      />
                    </MapboxGL.ShapeSource>
                  )}
                  <MapboxGL.PointAnnotation
                    key={props.post.idPosty}
                    id="punkt"
                    title="Test"
                    coordinate={[
                      props.post.Dlugosc_Geograficzna,
                      props.post.Szerokosc_Geograficzna,
                    ]}
                  />
                </MapViewer>
              )}
          </SectionContainer>
          <InformationAtribute>Zdjęcia</InformationAtribute>
          <ImagesContainer>
            {props.post.zdjecie &&
              props.post.zdjecie.map((img, index) => {
                return (
                  <Img
                    key={index}
                    source={{uri: userInfo.apiip + '/' + img.zdjecie}}
                  />
                );
              })}
          </ImagesContainer>
        </View>
        <InformationAtribute>
          {props.post.komentarze &&
            props.post.komentarze.length > 0 &&
            'Komentarze:'}
        </InformationAtribute>
        {props.post.komentarze &&
          props.post.komentarze.length > 0 &&
          props.post.komentarze.map((comment, index) => {
            return (
              <CommentContainer key={index}>
                <View>
                  {props.no == 0 && <HeaderText>Zaginął!</HeaderText>}
                  {props.post.typ_zgloszenia === 1 && (
                    <HeaderText>Zauważyłem!</HeaderText>
                  )}
                  {props.post.typ_zgloszenia === 2 && (
                    <HeaderText>Znaleziono oraz zabrano ze sobą!</HeaderText>
                  )}

                  <Item>
                    <UserLink
                      style={{color: 'green'}}
                      onPress={() => {
                        props.navigate.navigate('Profile', {
                          id: comment.idUżytkownik,
                        });
                      }}>
                      {comment.login ||
                        comment.adres_mail ||
                        comment.idUżytkownik}
                    </UserLink>
                  </Item>
                  <View>
                    {comment.data_zgloszenia && (
                      <View>
                        <Item>
                          {moment(comment.data_zgloszenia).format(
                            'D-MM-YYYY HH:mm:ss',
                          )}
                        </Item>
                      </View>
                    )}
                    <ItemAtribute>{comment.tresc || 'Nie podano'}</ItemAtribute>
                  </View>

                  <InformationList>
                    {comment.data_time && (
                      <View
                        style={{
                          width: '45%',
                          backgroundColor: '#27ae60',
                          margin: '1%',
                        }}>
                        <InformationAtribute style={{textAlign: 'center'}}>
                          Data zauważenia:
                        </InformationAtribute>
                        <InformationValue style={{textAlign: 'center'}}>
                          {moment(comment.data_time).format(
                            'D-MM-YYYY HH:mm:ss',
                          )}
                        </InformationValue>
                      </View>
                    )}
                    <View
                      style={{
                        width: '45%',
                        backgroundColor: '#27ae60',
                        margin: '1%',
                      }}>
                      <InformationAtribute style={{textAlign: 'center'}}>
                        Rasa:
                      </InformationAtribute>
                      <InformationValue>
                        {comment.rasa || 'Nie podano'}
                      </InformationValue>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        backgroundColor: '#27ae60',
                        margin: '1%',
                      }}>
                      <InformationAtribute style={{textAlign: 'center'}}>
                        Wielkość:
                      </InformationAtribute>
                      <InformationValue style={{textAlign: 'center'}}>
                        {comment.wielkosc || 'Nie podano'}
                      </InformationValue>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        backgroundColor: '#27ae60',
                        margin: '1%',
                      }}>
                      <InformationAtribute style={{textAlign: 'center'}}>
                        Kolor sierści:
                      </InformationAtribute>
                      <InformationValue style={{textAlign: 'center'}}>
                        {comment.kolor_siersci || 'Nie podano'}
                      </InformationValue>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        backgroundColor: '#27ae60',
                        margin: '1%',
                      }}>
                      <InformationAtribute style={{textAlign: 'center'}}>
                        Znaki szczególne:
                      </InformationAtribute>
                      <InformationValue style={{textAlign: 'center'}}>
                        {comment.znaki_szczegolne || 'Nie podano'}
                      </InformationValue>
                    </View>
                  </InformationList>
                  <InformationAtribute>Zdjęcia:</InformationAtribute>
                  <ImagesContainer>
                    {comment.zdjecie &&
                      comment.zdjecie.map((img, index) => {
                        return (
                          <Img
                            key={index}
                            source={{uri: userInfo.apiip + '/' + img.zdjecie}}
                          />
                        );
                      })}
                  </ImagesContainer>
                  {comment.Dlugosc_Geograficzna &&
                    comment.Szerokosc_Geograficzna && (
                      <LocationCommentContainer>
                        <Text>Lokalizacja:</Text>
                        <MapViewer
                          key={index}
                          onPress={({geometry}) => {
                            console.log(geometry.coordinate);
                          }}>
                          <MapboxGL.Camera
                            zoomLevel={14}
                            centerCoordinate={[
                              comment.Dlugosc_Geograficzna,
                              comment.Szerokosc_Geograficzna,
                            ]}
                          />
                          <MapboxGL.PointAnnotation
                            key={index}
                            id="punkt"
                            title="Test"
                            coordinate={[
                              comment.Dlugosc_Geograficzna,
                              comment.Szerokosc_Geograficzna,
                            ]}
                          />
                        </MapViewer>
                      </LocationCommentContainer>
                    )}
                </View>
              </CommentContainer>
            );
          })}

        <UserActions
          onPress={() => {
            setPosts([]);
            props.navigate.navigate('AddComment', {id: props.post.idPosty});
          }}>
          <Text>Dodaj komentarz</Text>
        </UserActions>
      </PostContainer>
    );
  };
  useEffect(() => {

    axios.get(userInfo.apiip + '/rasy').then(res => {
      if (res.data) {
        if (res.data.length > 0) {
          let temp = res.data;
          temp = res.data.filter(data => data.rasa !== null);
          setBreeds(temp);
        }
      }
    });
    axios
      .get(userInfo.apiip + '/posty/' + props.navigation.state.params.id )
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
      
  }, [props.navigation.state.params]);

  return (
    <MainContainer>
      <ScrollView>
        {posts && posts.length > 0 && (
          <View>
            {posts.map((post, index) => {
              return (
                <PostComponent
                  params={props.navigation.params}
                  key={index}
                  navigate={props.navigate}
                  post={post}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </MainContainer>
  );
};
export default Post;
