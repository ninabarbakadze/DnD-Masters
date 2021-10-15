import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);
// eslint-disable-next-line
export default function MapItem({ xCoord, yCoord, getSVGCoord, element }: any) {
  const [coord, setCoord] = useState({ x: xCoord, y: yCoord });

  useEffect(() => {
    Draggable.create('.draggable', {
      onDragEnd: (e: any) => {
        setCoord(getSVGCoord(e.x, e.y));
      },
    });
  }, [coord]);

  return <>{element}</>;
}
