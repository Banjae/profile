import React, { useEffect, useRef } from "react";
import Layout from "../common/Layout";

const Location = () => {
  const path = process.env.PUBLIC_URL;
  const { kakao } = window;
  const container = useRef();

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.94059, 128.614931), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(35.94059, 128.614931);

    const imageSrc = `${path}/images/marker.png`,
      imageSize = new kakao.maps.Size(60, 60),
      imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Location"}>
      <div id="map" ref={container}></div>
    </Layout>
  );
};

export default Location;
