import { useState, useRef } from 'react';

export default function MapItem({ x, y }: any) {
  const [position, setPosition] = useState({ x, y, coords: { x: 0, y: 0 } });

  const handleMouseMove = useRef((evt: any) => {
    setPosition(() => {
      const xDiff = position.coords.x - evt.pageX;
      const yDiff = position.coords.y - evt.pageY;
      return {
        x: position.x - xDiff,
        y: position.y - yDiff,
        coords: {
          x: evt.pageX,
          y: evt.pageY,
        },
      };
    });
  });

  const handleMouseDown = (evt: any) => {
    const { pageX, pageY } = evt;
    setPosition({ ...position, coords: { x: pageX, y: pageY } });
    document.addEventListener('mousemove', handleMouseMove.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove.current);
    setPosition({ ...position, coords: { x: 0, y: 0 } });
  };

  return (
    <svg
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="location-item"
      x={position.x}
      y={position.y}
    >
      <circle r="50" fill="red" />
    </svg>
  );
}
