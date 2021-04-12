import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {NewAppInfo} from '../../context/AppInfo';
import axios from 'axios';
import {NavigationContext} from 'react-navigation';
import ReactSpoiler from 'react-spoiler';
import moment from 'moment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  Container,
  Header,
  HeaderText,
  EditProfileButton,
  UserInfoText,
  InfoTextBold,
  SpoilerButton,
  SpoilerText,
  HeaderPostText,
  HeaderInfoText,
  InfoText,
  CommentContainer,
  LocationImagesContainer,
  Map,
  Img,
  PostsContainerInfo,
  PostInfo,
  UserActions,
  PostsContainer,
} from '../../styles/ProfileStyle';
import {getPowerStateSync} from 'react-native-device-info';
import {withNavigationFocus} from 'react-navigation';
const Profile = props => {
  const navigation = useContext(NavigationContext);
  const userInfo = useContext(NewAppInfo);
  const [nav, setNav] = useState(props.navigation.state.key);
  let me = userInfo.user.idUżytkownik;
  let id = props.navigation.getParam('id', me);
  const [isVisible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const updateVisible = () => {
    let val = !isVisible;
    setVisible(val);
    setTimeout(() => {
      if (val == true) {
        setVisible(!val);
      }
    }, 3000);
  };
  MapboxGL.setAccessToken(
    '*',
  );
  props.navigation.addListener('didFocus', payload => {
    setNav(payload);
  });
  // console.log(userInfo);
  useEffect(() => {
    axios
      .get(userInfo.apiip + '/uzytkownicy/' + id)
      .then(res => setUser(res.data[0]));
    axios
      .get(userInfo.apiip + '/postyuzytkownika/' + id)
      .then(res => setUserPosts(res.data));
  }, [nav]);
  const UserLostsComments = props => {
    var counter = 0;

    const commentsComponent = userPosts[props.post][props.id].komentarze.map(
      (comment, index) => {
        let route = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [
                  comment.Dlugosc_Geograficzna,
                  comment.Szerokosc_geograficzna,
                ],
              },
            },
          ],
        };
        let circles = {
          visibility: 'visible',
          circleRadius: comment.obszar || 0,
          circleColor: '#ff5722',
          circleStrokeColor: '#ff3d00',
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
              (earthCircumference * Math.cos(latitudeRadians)) /
              Math.pow(2, r + 8)
            );
          };

          var pixelValue = function(post, zoomLevel) {
            return (
              (post.obszar * 1000) /
              metersPerPixel(post.Dlugosc_Geograficzna, zoomLevel)
            );
          };
          console.log(r + ' ' + post.Dlugosc_geograficzna + ' ' + post.obszar);
          console.log(metersPerPixel(post.Dlugosc_geograficzna, r));
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
        if (index < 2) {
          return (
            <CommentContainer key={++counter}>
              <InfoText>
                <InfoTextBold>
                  {moment(comment.data_zgloszenia).format('YYYY-MM-D HH:mm:ss')}
                </InfoTextBold>
              </InfoText>
              <InfoText
                onPress={() => {
                  props.navigation.navigate('Profile', {
                    id: comment.idUżytkownik,
                  });
                }}>
                <InfoTextBold style={{color: 'green'}}>
                  {comment.login || comment.adres_mail || comment.idUżytkownik}
                </InfoTextBold>
              </InfoText>
              <InfoText>
                <InfoTextBold>{comment.tresc}</InfoTextBold>
              </InfoText>
              <PostsContainerInfo>
                <PostInfo>
                  <Text>Data zaginięcia:</Text>
                  <InfoTextBold>
                    {moment(comment.data_time).format(
                      'YYYY-MM-D HH:mm:ss',
                    )}
                  </InfoTextBold>
                </PostInfo>
                <PostInfo>
                  <Text>typ zwierzęcia:</Text>
                  <InfoTextBold>
                    {comment.typ_zwierzecia || 'nie określono'}
                  </InfoTextBold>
                </PostInfo>
                <PostInfo>
                  <Text>rasa:</Text>
                  <InfoTextBold>
                    {comment.rasa || 'Nie określonno'}
                  </InfoTextBold>
                </PostInfo>
                <PostInfo>
                  <Text>wielkość:</Text>
                  <InfoTextBold>
                    {comment.wielkosc || 'nie określono'}
                  </InfoTextBold>
                </PostInfo>
                <PostInfo>
                  <Text>kolor sierśći:</Text>
                  <InfoTextBold>
                    {comment.kolor_siersci || 'nie określono'}
                  </InfoTextBold>
                </PostInfo>
                <PostInfo>
                  <Text>znaki szczególne:</Text>
                  <InfoTextBold>
                    {comment.znaki_szczegolne || 'nie określono'}
                  </InfoTextBold>
                </PostInfo>
              </PostsContainerInfo>
              <LocationImagesContainer>
                {comment.zdjecia.map(img => {
                  //<Image source={userInfo.apiip + '/' + img.zdjecie} />;
                  return (
                    <Img
                      key={++counter}
                      source={{uri: userInfo.apiip + '/' + img.zdjecie}}
                    />
                  );
                })}
                <Map
                  onPress={({geometry}) => {
                    console.log(geometry.coordinate);
                  }}
                  ref={mapRef}
                  onDidFinishLoadingStyle={() => {
                    mapRef.current
                      .getZoom()
                      .then(r => handleCircle(r, comment));
                  }}
                  onRegionDidChange={() => {
                    mapRef.current
                      .getZoom()
                      .then(r => handleCircle(r, comment));
                  }}>
                  <MapboxGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[
                      comment.Dlugosc_geograficzna,
                      comment.Szerokosc_geograficzna,
                    ]}
                  />
                  <MapboxGL.PointAnnotation
                    key="punkt"
                    id="punkt"
                    title="Test"
                    coordinate={[
                      comment.Dlugosc_Geograficzna,
                      comment.Szerokosc_geograficzna,
                    ]}
                  />
                </Map>
              </LocationImagesContainer>
            </CommentContainer>
          );
        }
      },
    );

    return <View>{commentsComponent}</View>;
  };
  const UserLostsPosts = props => {
    var indexCounter = 0;

    const postsComponent = userPosts[props.no].map((post, index) => {
      let headerText;
      if (post.typ_zgloszenia == 0) {
        headerText = 'Zaginął!';
      } else if (post.typ_zgloszenia == 1) {
        headerText = 'Zauważono!';
      } else if (post.typ_zgloszenia == 2) {
        headerText = 'Znaleziono oraz zabrano ze sobą!';
      }

      let route = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [
                post.Dlugosc_Geograficzna,
                post.Szerokosc_geograficzna,
              ],
            },
          },
        ],
      };
      let circles = {
        visibility: 'visible',
        circleRadius: post.obszar || 0,
        circleColor: '#ff5722',
        circleStrokeColor: '#ff3d00',
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
            (earthCircumference * Math.cos(latitudeRadians)) /
            Math.pow(2, r + 8)
          );
        };

        var pixelValue = function(post, zoomLevel) {
          return (
            (post.obszar * 1000) /
            metersPerPixel(post.Dlugosc_Geograficzna, zoomLevel)
          );
        };
        console.log(r + ' ' + post.Dlugosc_geograficzna + ' ' + post.obszar);
        console.log(metersPerPixel(post.Dlugosc_geograficzna, r));
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
        <PostsContainer key={++indexCounter}>
          <HeaderInfoText>{headerText}</HeaderInfoText>
          <InfoText>
            <InfoTextBold>
              {moment(post.data_zgloszenia).format('YYYY-MM-D HH:mm:ss')}
            </InfoTextBold>
          </InfoText>
          <InfoText>
            <InfoTextBold
              style={{color: 'green'}}
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'Profile',
                  params: {
                    id: 10,
                  },
                  key: post.idUżytkownik,
                });
              }}>
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
                {moment(post.data_time).format(
                  'YYYY-MM-D HH:mm:ss',
                )}
              </InfoTextBold>
            </PostInfo>
            <PostInfo>
              <Text>typ zwierzęcia:</Text>
              <InfoTextBold>
                {post.typ_zwierzecia || 'nie określono'}
              </InfoTextBold>
            </PostInfo>
            <PostInfo>
              <Text>rasa:</Text>
              <InfoTextBold>{post.rasa || 'Nie określonno'}</InfoTextBold>
            </PostInfo>
            <PostInfo>
              <Text>wielkość:</Text>
              <InfoTextBold>{post.wielkosc || 'nie określono'}</InfoTextBold>
            </PostInfo>
            <PostInfo>
              <Text>kolor sierśći:</Text>
              <InfoTextBold>
                {post.kolor_siersci || 'nie określono'}
              </InfoTextBold>
            </PostInfo>
            <PostInfo>
              <Text>znaki szczególne:</Text>
              <InfoTextBold>
                {post.znaki_szczegolne || 'nie określono'}
              </InfoTextBold>
            </PostInfo>
          </PostsContainerInfo>
          <LocationImagesContainer>
            {circle && (
              <Map
                onPress={({geometry}) => {
                  console.log(geometry.coordinate);
                }}
                ref={mapRef}
                onDidFinishLoadingStyle={() => {
                  mapRef.current.getZoom().then(r => handleCircle(r, post));
                }}
                onRegionDidChange={() => {
                  mapRef.current.getZoom().then(r => handleCircle(r, post));
                }}>
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

            {post.zdjecia.map(img => {
              return (
                <Img
                  key={++indexCounter}
                  source={{uri: userInfo.apiip + '/' + img.zdjecie}}
                />
              );
            })}
          </LocationImagesContainer>
          <InfoTextBold>Komentarze : </InfoTextBold>
          <UserLostsComments key={++indexCounter} id={index} post={props.no} />
          <UserActions
            onPress={() => {
              props.navigation.navigate('AddComment', {id: post.idPosty});
            }}>
            <Text>Dodaj komentarz</Text>
          </UserActions>
          <UserActions
            onPress={() => {
              props.navigation.navigate('Post', {id: post.idPosty});
            }}>
            <Text>Zobacz wszystkie komentarze</Text>
          </UserActions>
        </PostsContainer>
      );
    });

    return <View>{postsComponent}</View>;
  };
  props.navigation.addListener('didFocus', payload => {
    setNav(payload);
  });
  return (
    <Container>
      <CustomHeader navigation={props.navigation} />
      <ScrollView>
        <Header>
          {me === id ? (
            <View>
              <HeaderText>Moj profil :</HeaderText>
              <EditProfileButton
                onPress={() => {
                  props.navigation.navigate('EditProfile');
                }}
                text="Edytuj profil"
              />
            </View>
          ) : (
            <HeaderText>
              Profil użytkownika:
              {user.login || user.adres_mail || user.idUżytkownik}
            </HeaderText>
          )}
        </Header>
        {user && (
          <View>
            <UserInfoText>
              <Text>id użytkownika: </Text>
              <InfoTextBold>{user.idUżytkownik}</InfoTextBold>
            </UserInfoText>
            <UserInfoText>
              <Text>adres e-mail:</Text>
              <InfoTextBold>{user.adres_mail || 'nie podano'}</InfoTextBold>
            </UserInfoText>
            <UserInfoText>
              <Text>login:</Text>
              <InfoTextBold>{user.login || 'nie podano'}</InfoTextBold>
            </UserInfoText>
            <UserInfoText>
              <Text>nr telefonu:</Text>
              <InfoTextBold>{user.nr_telefonu || 'nie podano'}</InfoTextBold>
            </UserInfoText>
            {me === id && (
              <SpoilerButton
                onPress={() => {
                  updateVisible();
                }}>
                {isVisible ? (
                  <SpoilerText>{user.unikalny_kod}</SpoilerText>
                ) : (
                  <SpoilerText>Odkryj unikalny kod</SpoilerText>
                )}
              </SpoilerButton>
            )}
          </View>
        )}
        <View>
          {Object.keys(userPosts).length > 0 && (
            <View>
              <HeaderPostText navigation={props.navigation}>
                Posty o zgubieniu zwierzęcia :
              </HeaderPostText>
              <UserLostsPosts navigation={props.navigation} no={0} key={0} />
              <HeaderPostText navigation={props.navigation}>
                Posty o zauważeniu zwierzęcia :
              </HeaderPostText>
              <UserLostsPosts navigation={props.navigation} no={1} key={1} />
              <HeaderPostText navigation={props.navigation}>
                Skomentowane posty :
              </HeaderPostText>
              <UserLostsPosts navigation={props.navigation} no={2} key={2} />
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};
export default withNavigationFocus(Profile);
