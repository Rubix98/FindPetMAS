import React, { useState, useEffect, useContext } from "react";
import useGeolocation from "react-hook-geolocation";
import FindPost from "./FindPost";
import {
  Container,
  SortPageButton,
  SortContainer,
  SortRow,
  SortLabel,
  SortLabelLocation,
  SortSelect,
  SortInput,
  SortButton,
} from "../../styles/LostPostsStyle";
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from "mapbox-gl-draw-circle";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import axios from "axios";
import { NewAppInfo } from "../../context/AppInfo";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import initialSortValues from "./initialSortValues";
import getDrawOptions from "./getDrawOptions";
import getSourceData from "./getSourceData";
import getSource from "./getSource";
import mapLayer from "./mapLayer";
const Map = ReactMapboxGl({
  accessToken: "*",
});
const useForceUpdate = () => useState()[1];
const FindPosts = (props) => {
  const forceUpdate = useForceUpdate();
  const [location, setLocation] = useState([18.598444, 53.01379]);
  const onGeolocationUpdate = (geolocation) => {
    setLocation([geolocation.longitude, geolocation.latitude]);
  };
  const [data, setData] = useState([]);
  const [allHairColour, setAllHairColour] = useState([]);
  const [allBreed, setAllBreed] = useState([]);
  const [openSort, setOpenSort] = useState(false);

  const userInfo = useContext(NewAppInfo);
  const [sortTempValues, setSortTempValues] = useState({
    global: {},
    location: {},
  });
  const [sortValues, setSortValues] = useState(initialSortValues);
  const draw = getDrawOptions(MapboxDraw);
  var moment = require("moment");
  const handleSortTempValues = (e) => {
    let tempObj = { ...sortTempValues.global };
    let temp = { ...sortTempValues };
    tempObj[e.target.id] = e.target.value;
    temp.global = tempObj;
    setSortTempValues({ ...temp });
  };
  const handleSort = () => {
    let temp = { ...sortTempValues };
    let newTemp = {};
    newTemp.filtr_tresc = "%" + (temp.global.content || "") + "%";
    newTemp.filtr_rasa = "%" + (temp.global.breed || "") + "%";
    newTemp.filtr_wielkosc = "%" + (temp.global.size || "") + "%";
    newTemp.filtr_kolor_siersci = "%" + (temp.global.hairColour || "") + "%";
    newTemp.filtr_data_zaginiecia_zauwazenia_dol = moment(
      temp.global.lostDateDown || "2010-06-12T19:30"
    ).format("YYYYMMDD HHmmss");
    newTemp.filtr_data_zaginiecia_zauwazenia_gora = moment(
      temp.global.lostDateUp || "2030-06-12T19:30"
    ).format("YYYYMMDD HHmmss");
    newTemp.filtr_znaki_szczegolne =
      "%" + (temp.global.specialInfo || "") + "%";
    newTemp.latitude = temp.location.latitude;
    newTemp.longitude = temp.location.longitude;
    newTemp.radius = temp.location.radius;

    setSortValues({ ...newTemp });
  };
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
      setLocation([
        drawTemp.features[0].properties.center[0],
        drawTemp.features[0].properties.center[1],
      ]);
      let tempLocation = {};
      tempLocation.latitude = drawTemp.features[0].properties.center[0];
      tempLocation.longitude = drawTemp.features[0].properties.center[1];
      tempLocation.radius = drawTemp.features[0].properties.radiusInKm;
      let tempObj = sortTempValues;
      tempObj.location = tempLocation;
      setSortTempValues({ ...tempObj });
      if (map.getSource("myPoint")) {
        map.getSource("myPoint").setData(
          getSourceData({
            longitude: drawTemp.features[0].properties.center[0],
            latitude: drawTemp.features[0].properties.center[1],
          })
        );
      } else {
        map.addSource(
          "myPoint",
          getSource({
            longitude: drawTemp.features[0].properties.center[0],
            latitude: drawTemp.features[0].properties.center[1],
          })
        );
        map.addLayer(mapLayer);
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
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${userInfo.apiip}/rasy`)
        .then((res) => {
          setAllBreed(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${userInfo.apiip}/siersc`)
        .then((res) => {
          setAllHairColour(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .post(`${userInfo.apiip}/postyzkomentarzami/1`, sortValues)
        .then((res) => {
          setData([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [props.coords, sortValues]);
  return (
    <Container mobile={userInfo.mobileMenu}>
      <div>
        <SortPageButton
          onClick={() => {
            setOpenSort(!openSort);
          }}
        >
          Filtruj
        </SortPageButton>
        {openSort && (
          <SortContainer>
            <SortRow>
              <SortLabel for="breed">
                <p>Rasa:</p>
                <SortSelect
                  id="breed"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""></option>
                  {allBreed.map((breed) => {
                    return <option value={breed.rasa}>{breed.rasa}</option>;
                  })}
                </SortSelect>
              </SortLabel>
              <SortLabel for="hairColour">
                <p>Kolor sierści:</p>
                <SortSelect
                  id="hairColour"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""></option>
                  {allHairColour.map((hair) => {
                    return (
                      <option value={hair.kolor_siersci}>
                        {hair.kolor_siersci}
                      </option>
                    );
                  })}
                </SortSelect>
              </SortLabel>
            </SortRow>{" "}
            <SortRow>
              <SortLabel for="specialInfo">
                <p>Znaki szczególne:</p>
                <SortInput
                  type="text"
                  id="specialInfo"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
              <SortLabel for="content">
                <p>Treść:</p>
                <SortInput
                  type="text"
                  id="content"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabel for="size">
                <p>Rozmiar:</p>
                <SortSelect
                  id="size"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  <option value="Mały">Mały</option>
                  <option value="Średni">Średni</option>
                  <option value="Duży">Duży</option>
                </SortSelect>
              </SortLabel>

              <SortLabel for="type">
                <p>Rodzaj zwierzęcia:</p>
                <SortSelect
                  id="type"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                >
                  <option value=""> </option>
                  <option value="Pies">Pies</option>
                  <option value="Kot">Kot</option>
                  <option value="Inne">Inne</option>
                </SortSelect>
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabel for="lostDate">
                <p>Data zauważenia(od):</p>
                <SortInput
                  type="datetime-local"
                  id="lostDateDown"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
              <SortLabel for="lostDate">
                <p>Data zauważenia(do):</p>
                <SortInput
                  type="datetime-local"
                  id="lostDateUp"
                  onChange={(e) => {
                    handleSortTempValues(e);
                  }}
                />
              </SortLabel>
            </SortRow>
            <SortRow>
              <SortLabelLocation for="location">
                <p>Lokalizacja:</p>
                <Map
                  style="mapbox://styles/mapbox/streets-v11"
                  center={[location[0], location[1]]}
                  containerStyle={{
                    width: "100%",
                    height: 150,
                  }}
                  onStyleLoad={(map, e) => {
                    handleMapLoaded(map);
                  }}
                />
              </SortLabelLocation>
            </SortRow>
            <SortButton
              onClick={() => {
                handleSort();
                forceUpdate();
              }}
            >
              Wyszukaj
            </SortButton>
          </SortContainer>
        )}
      </div>
      {data.map((date) => {
        return <FindPost key={Math.random()} data={date} />;
      })}
    </Container>
  );
};
export default FindPosts;
