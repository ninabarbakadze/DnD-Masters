// import { useEffect, useState } from 'react';
import { useRef, useState } from 'react';
import PointSelection from '../PointSelection/PointSelection';

export default function MapEdit() {
  const svgRef = useRef(null);
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const [location, setLocation] = useState(<circle r="40" fill="red" />);
  const [locationArr, setLocationArr] = useState([location]);

  const setPoint = (evt: any) => {
    const dim = evt.target.getBoundingClientRect();
    const x = evt.clientX - dim.left;
    const y = evt.clientY - dim.top;
    setPt({ x, y });
    console.log(pt);
    const svg = (
      <svg className="location-item" x={pt.x} y={pt.y}>
        {location}
      </svg>
    );
    const locationArrCopy = [...locationArr];
    locationArrCopy.push(svg);
    setLocationArr(locationArrCopy);
    setLocation(<circle />);
  };

  return (
    <div className="map-edit-container">
      <div className="map-edit-image">
        <svg
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
