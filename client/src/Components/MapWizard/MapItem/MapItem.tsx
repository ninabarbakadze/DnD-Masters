import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);
// eslint-disable-next-line
export default function MapItem({ xCoord, yCoord, getSVGCoord }: any) {
  const [coord, setCoord] = useState({ x: xCoord, y: yCoord });
  useEffect(() => {
    Draggable.create('.test', {
      onDragEnd: (e) => {
        setCoord(getSVGCoord(e.x, e.y));
      },
    });
  }, [coord]);

  useEffect(() => {
    console.log('second', coord);
  }, [coord]);
  return <circle className="test" r="50" cx={xCoord} cy={yCoord} fill="red" />;
}
