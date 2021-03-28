/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Picker,
  Image,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {NewAppInfo} from '../../context/AppInfo';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {NavigationEvents} from 'react-navigation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {withNavigationFocus} from 'react-navigation';
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
  MapView,
  ImagesContainer,
  Img,
  CommentContainer,
  InformationComment,
  LocationCommentContainer,
  MapViewer,
  FiltrMapViewer,
  AddCommentButton,
  TextButton,
  ActionContainer,
  ActionButton,
  ActionButtonText,
  ActionButtonClicked,
  ActionButtonClickedText,
  InputText,
  InputLabel,
  PickerContainer,
  Select,
  TimeButton,
  SortContainer,
  SortButton,
  SortButtonClicked,
  SortIcon,
  UserActions,
  FiltrButton,
} from '../../styles/PostsStyle';
const Posts = props => {
  console.log('START');
  console.log(props.start);

  MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA',
  );
  const userInfo = useContext(NewAppInfo);
  const [posts, setPosts] = useState([]);
  const [allBreeds, setBreeds] = useState([]);
  const [startIsVisible, setStartIsVisible] = useState(false);
  const [endIsVisible, setEndIsVisible] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [useSort, setUseSort] = useState(false);
  const [sortLocation, setSortLocation] = useState(0);
  const [sortAddDate, setSortAddDate] = useState(0);
  const [sortNoticeDate, setSortNoticeDate] = useState(0);
  const [sortBreed, setSortBreed] = useState(0);
  const [sortAnimalType, setSortAnimalType] = useState(0);
  const [sortSize, setSortSize] = useState(0);
  const [sortActually, setSortActually] = useState('');
  const [filterContent, setFilterContent] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterBreed, setFilterBreed] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [filterHairColour, setFilterHairColour] = useState('');
  const [filterNoticeDateStart, setFilterNoticeDateStart] = useState('');
  const [filterNoticeDateEnd, setFilterNoticeDateEnd] = useState('');
  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();
  const [refresh, setRefresh] = useState(0);
  const openFilter = () => {
    let temp = useFilter;
    setUseFilter(!temp);
  };
  const openSort = () => {
    let temp = useSort;
    setUseFilter(false);
    setUseSort(!temp);
  };

  const confirm_start = date => {
    changeVisible_start();
    let temp = moment(date).format('YYMMD HHmmss');
    setFilterNoticeDateStart(temp);
  };

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
      console.log(post);
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
      console.log(r + ' ' + post.Dlugosc_Geograficzna + ' ' + post.obszar);
      console.log(metersPerPixel(post.Dlugosc_Geograficzna, r));
      let newCircles = {
        visibility: 'visible',
        circleRadius: pixelValue(post, r) || 0,
        circleColor: '#ff5722',
        circleStrokeColor: '#ff3d00',
        circleStrokeWidth: 5,
        circleOpacity: 0.7,
      };
      console.log('||');
      console.log(pixelValue(post, r));
      setCircle({...newCircles});
    };
    return (
      <PostContainer>
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
                  id: props.post.idUzytkownik,
                });
              }}>
              {props.post.login ||
                props.post.adres_mail ||
                props.post.idUzytkownik}
            </UserLink>
          </Item>
          <View>
            {props.post.data_dodania && (
              <View>
                <Item>
                  {moment(props.post.data_dodania).format('D-MM-YYYY HH:mm:ss')}
                </Item>
              </View>
            )}
            <ItemAtribute>{props.post.tresc || 'Nie podano'}</ItemAtribute>
          </View>

          <InformationList>
            {props.post.data_zaginiecia_zauwazenia && (
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
                  {moment(props.post.data_zaginiecia_zauwazenia).format(
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
                        //id="population"
                        id="sf2010CircleFill"
                        //sourceLayerID="sf2010"
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
            if (index < 2) {
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
                            id: comment.idUzytkownik,
                          });
                        }}>
                        {comment.login ||
                          comment.adres_mail ||
                          comment.idUzytkownik}
                      </UserLink>
                    </Item>
                    <View>
                      {comment.data_dodania && (
                        <View>
                          <Item>
                            {moment(comment.data_dodania).format(
                              'D-MM-YYYY HH:mm:ss',
                            )}
                          </Item>
                        </View>
                      )}
                      <ItemAtribute>
                        {comment.tresc || 'Nie podano'}
                      </ItemAtribute>
                    </View>

                    <InformationList>
                      {comment.data_zaginiecia_zauwazenia && (
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
                            {moment(comment.data_zaginiecia_zauwazenia).format(
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
            }
          })}

        <UserActions
          onPress={() => {
            setPosts([]);
            props.navigate.navigate('AddComment', {id: props.post.idPosty});
          }}>
          <Text>Dodaj komentarz</Text>
        </UserActions>
        <UserActions
          onPress={() => {
            setPosts([]);
            props.navigate.navigate('Post', {id: props.post.idPosty});
          }}>
          <Text>Zobacz wszystkie komentarze</Text>
        </UserActions>
      </PostContainer>
    );
  };
  const [typeAnimal, setTypeAnimal] = useState();
  const [breedAnimal, setBreedAnimal] = useState();
  const [sizeAnimal, setSizeAnimal] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [contentText, setContentText] = useState();
  const [hairColour, setHairColour] = useState();
  const [myRadius, setMyRadius] = useState(0);
  const [location, setLocation] = useState();
  const [filtrVariables, setFiltrVariables] = useState({});
  let route = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [
            location ? location[0] : 18.6057,
            location ? location[1] : 53.015331,
          ],
        },
      },
    ],
  };
  let circles = {
    visibility: 'visible',
    circleRadius: myRadius || 0,
    circleColor: '#ff5722',
    circleStrokeColor: '#ff3d00',
    circleStrokeWidth: 5,
    circleOpacity: 0.7,
  };
  const [circle, setCircle] = useState(circles);
  const mapRef = useRef(null);
  const handleCircle = (r, location, myRadius) => {
    const metersPerPixel = (lat, r) => {
      var earthCircumference = 40075017;
      var latitudeRadians = lat * (Math.PI / 180);
      return (
        (earthCircumference * Math.cos(latitudeRadians)) / Math.pow(2, r + 8)
      );
    };

    const pixelValue = (location, zoomLevel, myRadius) => {
      return (myRadius * 1000) / metersPerPixel(location, zoomLevel);
    };
    console.log(r + ' ' + location[0] + ' ' + myRadius);
    console.log(metersPerPixel(location[0], r));
    let newCircles = {
      visibility: 'visible',
      circleRadius: pixelValue(location[0], r, myRadius) || 0,
      circleColor: '#ff5722',
      circleStrokeColor: '#ff3d00',
      circleStrokeWidth: 5,
      circleOpacity: 0.7,
    };
    console.log('||');
    setCircle({...newCircles});
  };

  const startFiltr = () => {
    let temp = {};
    temp.filtr_tresc = '%' + (contentText || '') + '%';
    temp.filtr_rasa = '%' + (breedAnimal || '') + '%';
    temp.filtr_wielkosc = '%' + (sizeAnimal || '') + '%';
    temp.filtr_kolor_siersci = '%' + (hairColour || '') + '%';
    temp.filtr_data_zaginiecia_zauwazenia_dol = moment(
      startDate || '2010-06-12T19:30',
    ).format('YYYYMMDD HHmmss');
    temp.filtr_data_zaginiecia_zauwazenia_gora = moment(
      endDate || '2030-06-12T19:30',
    ).format('YYYYMMDD HHmmss');
    temp.filtr_znaki_szczegolne = '%' + '' + '%';
    temp.latitude = location ? location[0] : null;
    temp.longitude = location ? location[1] : null;
    temp.radius = myRadius;
    setFiltrVariables({...temp});
  };
  const updatePoints = async points => {
    setLocation([points[0], points[1]]);
  };
  useEffect(() => {
    console.log('}}}}}}}}]');
    console.log(filtrVariables);
    const fetchData = async () => {
      await axios.get(userInfo.apiip + '/rasy').then(res => {
        if (res.data) {
          if (res.data.length > 0) {
            let temp = res.data;
            temp = res.data.filter(data => data.rasa !== null);
            setBreeds(temp);
          }
        }
      });
      console.log('psosty');
      await axios
        .post(
          userInfo.apiip + '/postyzkomentarzami/' + props.no || 1,
          filtrVariables,
        )
        .then(res => {
          console.log('||||||||||||||||');
          setPosts(res.data);
          console.log(res.data);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [filtrVariables]);

  console.log(props);
  return (
    <MainContainer>
      <ScrollView>
        <ActionContainer>
          <ActionButton
            onPress={() => {
              openFilter();
            }}>
            <ActionButtonText>Filtruj</ActionButtonText>
          </ActionButton>
        </ActionContainer>
        {useFilter && (
          <View>
            <InputText
              placeholder="Treść"
              onChangeText={text => {
                setContentText(text);
              }}
            />
            <InputLabel>Wybierz rodzaj zwierzęcia:</InputLabel>
            <PickerContainer>
              <Select
                selectedValue={typeAnimal || ''}
                onValueChange={(itemValue, itemIndex) => {
                  setTypeAnimal(itemValue);
                }}>
                <Picker.Item key="" label="" value="" />
                <Picker.Item key="Pies" label="Pies" value="Pies" />
                <Picker.Item key="Kot" label="Kot" value="Kot" />
                <Picker.Item key="Inne" label="Inne" value="Inne" />
              </Select>
            </PickerContainer>
            <InputLabel>Wybierz rasę:</InputLabel>
            <PickerContainer>
              <Select
                selectedValue={breedAnimal}
                onValueChange={(itemValue, itemIndex) => {
                  setBreedAnimal(itemValue);
                }}>
                <Picker.Item key="" label="" value="" />
                {allBreeds.map(breed => {
                  return (
                    <Picker.Item
                      key={breed.rasa}
                      label={breed.rasa}
                      value={breed.rasa}
                    />
                  );
                })}
              </Select>
            </PickerContainer>
            <InputLabel>Wybierz wielkość:</InputLabel>
            <PickerContainer>
              <Select
                selectedValue={sizeAnimal}
                onValueChange={(itemValue, itemIndex) =>
                  setSizeAnimal(itemValue)
                }>
                <Picker.Item label="" value="" />
                <Picker.Item label="Mały" value="Mały" />
                <Picker.Item label="Średni" value="Średni" />
                <Picker.Item label="Duży" value="Duży" />
              </Select>
            </PickerContainer>
            <InputText
              onChangeText={text => {
                setHairColour(text);
              }}
              placeholder="Kolor sierści"></InputText>
            <InputLabel>Od chwili(data):</InputLabel>
            <TimeButton onPress={changeVisible_start}>
              <InputLabel>
                {moment(filterNoticeDateStart).format('D-MM-YYYY HH:mm:ss') ==
                'Invalid date'
                  ? 'Nie podano daty'
                  : moment(filterNoticeDateStart).format('D-MM-YYYY HH:mm:ss')}
              </InputLabel>
            </TimeButton>
            <DateTimePicker
              mode="datetime"
              locale="pl"
              isVisible={startIsVisible}
              onConfirm={date => {
                setStartDate(date);
              }}
              onCancel={changeVisible_start}
            />

            <InputLabel>Do chwili(data):</InputLabel>
            <DateTimePicker
              mode="datetime"
              locale="pl"
              isVisible={endIsVisible}
              onConfirm={date => {
                setEndDate(date);
              }}
              onCancel={changeVisible_end}
            />
            <TimeButton onPress={changeVisible_end}>
              <InputLabel>
                {moment(filterNoticeDateEnd).format('D-MM-YYYY HH:mm:ss') ==
                'Invalid date'
                  ? 'Nie podano daty'
                  : moment(filterNoticeDateEnd).format('D-MM-YYYY HH:mm:ss')}
              </InputLabel>
            </TimeButton>
            <Text>Obszar:</Text>
            <PickerContainer>
              <Select
                selectedValue={myRadius}
                onValueChange={(itemValue, itemIndex) =>
                  setMyRadius(itemValue)
                }>
                <Picker.Item label="0" value={0} />
                <Picker.Item label="0.4" value={0.4} />
                <Picker.Item label="0.8" value={0.8} />
                <Picker.Item label="1.2" value={1.2} />
                <Picker.Item label="1.6" value={1.6} />
              </Select>
            </PickerContainer>
            <FiltrMapViewer
              ref={mapRef}
              onPress={({geometry}) => {
                updatePoints(geometry.coordinates);
              }}
              onDidFinishLoadingStyle={() => {
                if (myRadius > 0) {
                  mapRef.current
                    .getZoom()
                    .then(r => handleCircle(r, location, myRadius));
                }
              }}
              onRegionDidChange={() => {
                if (myRadius > 0) {
                  mapRef.current
                    .getZoom()
                    .then(r => handleCircle(r, location, myRadius));
                }
              }}>
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[
                  location ? location[0] : 18.6057,
                  location ? location[1] : 53.015331,
                ]}
              />

              {myRadius > 0.1 && (
                <MapboxGL.ShapeSource id="line1" shape={route}>
                  <MapboxGL.CircleLayer
                    circleRadius={60}
                    //id="population"
                    id="sf2010CircleFill"
                    //sourceLayerID="sf2010"
                    style={circle}
                  />
                </MapboxGL.ShapeSource>
              )}

              <MapboxGL.PointAnnotation
                key={0}
                id="punkt"
                title="Test"
                coordinate={[
                  location ? location[0] : 18.6057,
                  location ? location[1] : 53.015331,
                ]}
              />
            </FiltrMapViewer>
            <FiltrButton
              onPress={() => {
                startFiltr();
              }}
              style={{
                backgroundColor: '#66F9A3',
              }}>
              <Text style={{fontSize: 20}}>Szukaj</Text>
            </FiltrButton>
          </View>
        )}
        {posts && posts.length > 0 && (
          <View>
            {console.log(posts[0])}
            {posts.map((post, index) => {
              return (
                <PostComponent
                  no={props.no}
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
export default Posts;
