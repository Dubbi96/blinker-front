import React, { useState } from "react";
import { GNB_HEIGHT } from "../../layouts/Header";
import { Button, Stack } from "@mui/material";
import Legend from "../../components/Monitoring/Legend";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  Roadview,
  ZoomControl,
} from "react-kakao-maps-sdk";
import Title from "../../components/Title";
import greenMarker from "../../assets/images/marker-green.png";
import yellowMarker from "../../assets/images/marker-yellow.png";
import redMarker from "../../assets/images/marker-red.png";
import { dummySignalLights } from "./dummy";
import SensorList from "../../components/Monitoring/SensorList";

const Monitoring = () => {
  const [sensors, setSensors] = useState(dummySignalLights);
  const [isRoadviewActive, setIsRoadviewActive] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState();

  const handleClickMarker = (marker) => {
    setSelectedMarker(marker);
  };

  // 로드뷰 보기 버튼 클릭 시 위치 설정
  const toggleView = () => {
    setIsRoadviewActive((prev) => !prev);
  };

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      {/* 신호기 목록 */}
      <SensorList sensors={sensors} />
      {/* 카카오맵 */}
      <Stack
        sx={{
          flex: "1",
          position: "relative",
          maxHeight: `calc(100vh - ${GNB_HEIGHT}px)`,
        }}
      >
        <Title title="지도보기" />
        {isRoadviewActive ? (
          <Roadview
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
              radius: 50,
            }}
            style={{ width: "100%", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
          />
        ) : (
          <>
            <Map
              center={{ lat: 37.2803, lng: 127.0181 }}
              level={6}
              style={{
                width: "100%",
                height: `calc(100vh - ${GNB_HEIGHT}px)`,
              }}
            >
              <ZoomControl />
              <MarkerClusterer averageCenter={true} minLevel={6} gridSize={35}>
                {sensors.map((marker) => {
                  return (
                    <MapMarker
                      key={`${marker.latitude}-${marker.longitude}`}
                      position={{
                        lat: marker.latitude,
                        lng: marker.longitude,
                      }}
                      image={{
                        src:
                          marker.status === "정상"
                            ? greenMarker
                            : marker.status === "오류"
                            ? redMarker
                            : yellowMarker,
                        size: {
                          width: 30,
                          height: 30,
                        },
                      }}
                      onClick={() => handleClickMarker(marker)}
                      // title={`(${pos.lat}, ${pos.lng})`}
                    />
                  );
                })}
              </MarkerClusterer>
            </Map>
            <Legend />
          </>
        )}
        <Button
          onClick={toggleView}
          variant="contained"
          color="secondary"
          sx={{
            position: "absolute",
            top: "65px",
            right: isRoadviewActive ? "10px" : "50px",
            zIndex: 2,
          }}
        >
          {isRoadviewActive ? "지도 보기" : "로드뷰 보기"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Monitoring;
