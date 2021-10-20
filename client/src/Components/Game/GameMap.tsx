// eslint-disable-next-line
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import MapItem from '../MapWizard/MapItem/MapItem';
import getMapElements from '../../assets/mapElements/mapData';
import { IRootState } from '../../reducers';

export default function GameMap() {
  const imgRef = useRef<any>(null);
  const { mapUrl, elementArr } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  const [locationArr, setLocationArr] = useState<JSX.Element[]>([]);
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

  useLayoutEffect(() => {
    setViewBoxString(
      `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`,
    );
  }, [newViewBox]);

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

  // Point
  function getSVGCoord(x: number, y: number): {} {
    const svg = document.querySelector('.main-svg');
    if (!svg) return {};
    // @ts-expect-error
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    // @ts-expect-error
    const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    return cursorPoint;
  }

  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      const bbox = document.querySelector('.test1')?.getBBox();
      setDimensions({
        width: bbox.width,
        height: bbox.height,
      });
    }, 1);
  }, []);

  useEffect(() => {
    const locations = elementArr?.map((element) => {
      const el = getMapElements(element.x, element.y, element.elementName);
      return (
        <MapItem
          // eslint-disable-next-line
          // deleteLocation={deleteLocation}
          id={element.id}
          locationName={element.title}
          locationDescription={element.description}
          xCoord={element.x}
          yCoord={element.y}
          element={el}
          getSVGCoord={(x: number, y: number) => getSVGCoord(x, y)}
        />
      );
    });
    setLocationArr(locations);
  }, []);

  return (
    <div className="map-edit-image">
      <div>
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
          <image
            className="test1"
            x={-dimensions.width / 2}
            y={-dimensions.height / 2}
            ref={imgRef}
            href={mapUrl}
          />
          {/* <foreignObject
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
        </foreignObject> */}
          {locationArr}
        </svg>
      </div>
      <button onClick={() => zoom(0.8)} type="button">
        Zoom In
      </button>
      <button onClick={() => zoom(1.25)} type="button">
        Zoom Out
      </button>
    </div>
  );
}
