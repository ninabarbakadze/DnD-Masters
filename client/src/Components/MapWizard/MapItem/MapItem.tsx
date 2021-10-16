import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);
export default function MapItem({
  xCoord,
  yCoord,
  getSVGCoord,
  element,
  locationName,
  locationDescription,
  id,
}: any) {
  const [coord, setCoord] = useState({ x: xCoord, y: yCoord });
  const [isHovered, setIsHovered] = useState(false);

  function showDescription() {
    setIsHovered(true);
  }

  function hideDescription() {
    setIsHovered(false);
  }

  useEffect(() => {
    Draggable.create('.draggable', {
      onDragEnd: (e: any) => {
        setCoord(getSVGCoord(e.x, e.y));
        console.log(id);
      },
    });
  }, [coord]);

  return (
    <g
      onMouseEnter={showDescription}
      onMouseLeave={hideDescription}
      transform={`translate(${xCoord} ${yCoord})`}
      className="draggable"
    >
      {element}
      <text>{locationName}</text>
      <foreignObject width="100" height="50">
        <div
          className={
            isHovered ? 'description-text' : 'not-visible description-text'
          }
        >
          {locationDescription}
        </div>
      </foreignObject>
    </g>
  );
}
