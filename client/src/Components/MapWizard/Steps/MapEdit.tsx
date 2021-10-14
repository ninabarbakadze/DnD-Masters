// import { useEffect, useState } from 'react';
import { useRef, useState } from 'react';
import PointSelection from '../PointSelection/PointSelection';

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
  const [newViewBox, setNewViewBox] = useState({ x: 0, y: 0 });
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const [location, setLocation] = useState(<circle r="40" fill="red" />);
  const [locationArr, setLocationArr] = useState<JSX.Element[]>([]);

  const setPoint = (evt: any) => {
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
  };

  function getPointFromEvent(evt: any) {
    const point = { x: 0, y: 0 };
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  }

  function onPointerDown(evt: any) {
    setIsPointerDown(true);
    const pointerPosition = getPointFromEvent(evt);
    setPointerOrigin({ x: pointerPosition.x, y: pointerPosition.y });
  }

  function onPointerMove(evt: any) {
    if (!isPointerDown) return;
    evt.preventDefault();
    const pointerPosition = getPointFromEvent(evt);
    setNewViewBox({
      x: viewBox.x - (pointerPosition.x - pointerOrigin.x),
      y: viewBox.y - (pointerPosition.y - pointerOrigin.y),
    });
    const viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    document.querySelector('svg')?.setAttribute('viewBox', viewBoxString);
  }

  function onPointerUp() {
    setIsPointerDown(false);
    setViewBox({
      x: newViewBox.x,
      y: newViewBox.y,
      width: 1200,
      height: 600,
    });
  }

  return (
    <div className="map-edit-container">
      <div className="map-edit-image">
        <svg
          className="main-svg"
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onMouseMove={onPointerMove}
          ref={svgRef}
          onClick={setPoint}
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
        >
          <image href="https://i.pinimg.com/originals/43/b5/a8/43b5a812c80701bb83bd5da117d6fae2.jpg" />
          {locationArr}
        </svg>
      </div>
      <PointSelection />
    </div>
  );
}
