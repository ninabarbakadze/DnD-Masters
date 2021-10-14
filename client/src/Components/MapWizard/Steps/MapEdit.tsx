// eslint-disable-next-line
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import PointSelection from '../PointSelection/PointSelection';
import MapItem from '../MapItem/MapItem';

export default function MapEdit() {
  const svgRef = useRef(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [pointerOrigin, setPointerOrigin] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 1200,
    height: 600,
  });
  const [newViewBox, setNewViewBox] = useState({
    x: 0,
    y: 0,
    width: 1200,
    height: 600,
  });
  const [viewBoxString, setViewBoxString] = useState('0 0 1200 600');
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const [location, setLocation] = useState(<circle r="40" fill="red" />);
  const [locationArr, setLocationArr] = useState<JSX.Element[]>([]);
  const [keyCode, setKeyCode] = useState('');

  const setPoint = (evt: any) => {
    if (keyCode !== 'Space') {
      const dim = evt.target.getBoundingClientRect();
      const x = evt.clientX - dim.left;
      const y = evt.clientY - dim.top;
      setPt({ x, y });
      console.log(pt);
      const svg = (
        <svg className="location-item" x={x} y={y}>
          {location}
        </svg>
      );
      const locationArrCopy = [...locationArr];
      locationArrCopy.push(svg);
      setLocationArr(locationArrCopy);
      setLocation(<circle r="40" fill="blue" />);
    }
  };

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

  function zoom(level: number) {
    const { width, height } = newViewBox;
    const zoomedViewBox = {
      ...newViewBox,
      width: width * level,
      height: height * level,
    };
    setNewViewBox(zoomedViewBox);
    setViewBox(zoomedViewBox);
  }

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

  return (
    <div className="map-edit-container">
      <div className="map-edit-image">
        <svg
          className="main-svg"
          onMouseDown={(evt) => {
            onPointerDown(evt);
            setPoint(evt);
          }}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onMouseMove={onPointerMove}
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={viewBoxString}
        >
          <image href="https://i.pinimg.com/originals/43/b5/a8/43b5a812c80701bb83bd5da117d6fae2.jpg" />
          {locationArr}
          <MapItem x="50" y="50" />
        </svg>
        <button onClick={() => zoom(0.5)} type="button">
          Zoom In
        </button>
        <button onClick={() => zoom(2)} type="button">
          Zoom Out
        </button>
      </div>
      <PointSelection />
    </div>
  );
}
