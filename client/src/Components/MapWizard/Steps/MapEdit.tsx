import { useEffect, useRef, useState } from 'react';

export default function MapEdit() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (imgRef.current) {
      setHeight(imgRef.current.offsetHeight);
      setWidth(imgRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      {console.log(width, height)}
      <h1>Edit Map</h1>
      <div className="map-edit-container">
        <svg>
          <image href="https://i.pinimg.com/originals/43/b5/a8/43b5a812c80701bb83bd5da117d6fae2.jpg" />
          <circle r="40" cx="200" cy="200" fill="red" />
        </svg>
      </div>
      <p>
        width:
        {width}
      </p>
      <p>
        height:
        {height}
      </p>
    </div>
  );
}
