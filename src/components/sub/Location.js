import React, { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

const Location = () => {
  const path = process.env.PUBLIC_URL;

  const { kakao } = window;

  const infoArr = [
    {
      title: '대구 그린 컴퓨터',
      latLng: new kakao.maps.LatLng(35.868376, 128.594065),
      imgSrc: `${path}/images/marker.png`,
      imgSize: new kakao.maps.Size(64, 69),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: '한강',
      latLng: new kakao.maps.LatLng(37.511507, 126.997067),
      imgSrc: `${path}/images/marker.png`,
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: '남산',
      latLng: new kakao.maps.LatLng(37.551776, 126.988169),
      imgSrc: `${path}/images/marker.png`,
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ];

  const [info, setInfo] = useState(infoArr);
  const [pos, setPos] = useState(null);
  const [idx, setIdx] = useState(0);

  const container = useRef(null);
  const btns = useRef(null);

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: info[idx].latLng, //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    // 중첩되는 지도 html 태그를 지워준다
    container.current.innerHTML = '';

    const map = new kakao.maps.Map(container.current, options);

    const markerPosition = info[idx].latLng;

    const imageSrc = info[idx].imgSrc;

    const imageSize = info[idx].imgSize;

    const imageOption = info[idx].imgPos;

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
    setPos(map);

    for (const btn of btns.current.children) {
      btn.classList.add('on');
      btn.classList.remove('on');
    }
    btns.current.children[idx].classList.add('on');

    const mapCenter = () => {
      map.setCenter(info[idx].latLng);
    };

    //스카이뷰 전환버튼 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    // 확대 축소버튼 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    window.addEventListener('resize', mapCenter);
    return () => {
      window.removeEventListener('resize', mapCenter);
    };
  }, [idx]);

  return (
    <Layout title={'Location'}>
      <div id='map' ref={container}></div>
      <div className='btnSet'>
        <ul ref={btns}>
          {info.map((ele, idx) => {
            return (
              <li key={idx} onClick={() => setIdx(idx)}>
                {infoArr[idx].title}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Location;
