// import { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Draggable } from 'gsap/Draggable';

// gsap.registerPlugin(Draggable);
// eslint-disable-next-line
export default function MapItem({ xCoord, yCoord }: any) {
  return <circle className="test" r="50" cx={xCoord} cy={yCoord} fill="red" />;
}
