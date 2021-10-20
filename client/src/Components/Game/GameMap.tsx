// eslint-disable-next-line
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { getMap } from '../../services/map.service';
import { IRootState } from '../../reducers';

export default function GameMap() {
  const imgRef = useRef<any>(null);
  // const dispatch = useDispatch();
  const { mapId } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  const [mapUrl, setMapurl] = useState('');
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [pointerOrigin, setPointerOrigin] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({
    x: -600,
    y: -300,
    width: 1200,
    height: 600,
  });
  const [newViewBox, setNewViewBox] = useState({
    x: -600,
    y: -300,
    width: 1200,
    height: 600,
  });
  const [viewBoxString, setViewBoxString] = useState('-600 -300 1200 600');

  const [keyCode, setKeyCode] = useState('');

  const getMapData = async () => {
    const mapData = await getMap('ruso', mapId);
    setMapurl(mapData.mapUrl);
  };

  useLayoutEffect(() => {
    setViewBoxString(
      `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`,
    );
  }, [newViewBox]);

  useEffect(() => {
    getMapData();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Space') {
        setKeyCode('Space');
      }
    });
    document.addEventListener('keyup', (evt) => {
      if (evt.code === 'Space') {
        setKeyCode('');
      }
    });
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, [mapUrl, imgRef.current]);

  // Panning
  function getPointFromEvent(evt: any) {
    const point = { x: 0, y: 0 };
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  }

  function onPointerDown(evt: any) {
    if (keyCode === 'Space') {
      setIsPointerDown(true);
      const pointerPosition = getPointFromEvent(evt);
      setPointerOrigin({ x: pointerPosition.x, y: pointerPosition.y });
    }
  }

  function onPointerMove(evt: any) {
    if (!isPointerDown) return;
    evt.preventDefault();
    const pointerPosition = getPointFromEvent(evt);
    setNewViewBox({
      x: viewBox.x - (pointerPosition.x - pointerOrigin.x),
      y: viewBox.y - (pointerPosition.y - pointerOrigin.y),
      width: viewBox.width,
      height: viewBox.height,
    });
  }

  function onPointerUp() {
    setIsPointerDown(false);
    setViewBox({
      x: newViewBox.x,
      y: newViewBox.y,
      width: newViewBox.width,
      height: newViewBox.height,
    });
  }

  // Zoom
  async function zoom(level: number) {
    // eslint-disable-next-line
    const { width, height, x, y } = newViewBox;
    const zoomedViewBox = {
      x: x + (width - width * level) / 2,
      y: y + (height - height * level) / 2,
      width: width * level,
      height: height * level,
    };
    const test = `${zoomedViewBox.x} ${zoomedViewBox.y} ${zoomedViewBox.width} ${zoomedViewBox.height}`;
    await gsap.to('.main-svg', 0.3, { attr: { viewBox: test } });
    setNewViewBox(zoomedViewBox);
    setViewBox(zoomedViewBox);
  }

  return (
    <div className="map-edit-image">
      <svg
        className="main-svg"
        onMouseDown={(evt) => {
          onPointerDown(evt);
        }}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onMouseMove={onPointerMove}
        width="100%"
        height="100%"
        viewBox={viewBoxString}
      >
        <foreignObject
          width={dimensions.width}
          height={dimensions.height}
          y={-dimensions.height / 2}
          x={-dimensions.width / 2}
        >
          <img
            ref={imgRef}
            // eslint-disable-next-line
            src={mapUrl}
            alt=""
          />
        </foreignObject>
        {/* {locationArr} */}
      </svg>
      <button onClick={() => zoom(0.8)} type="button">
        Zoom In
      </button>
      <button onClick={() => zoom(1.25)} type="button">
        Zoom Out
      </button>
    </div>
  );
}
