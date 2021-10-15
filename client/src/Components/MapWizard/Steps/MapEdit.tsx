// eslint-disable-next-line
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import PointSelection from '../PointSelection/PointSelection';
import MapItem from '../MapItem/MapItem';
import Modal from '../Modal/Modal';
import getMapElements from '../../../assets/mapElements/mapData';

export default function MapEdit() {
  const svgRef = useRef(null);
  const mapReducer = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
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
  const [locationArr, setLocationArr] = useState<JSX.Element[]>([]);
  const [keyCode, setKeyCode] = useState('');
  const [modalIsActive, setModalIsActive] = useState(false);

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
  }

  // Zoom

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

  // Create Modal for further information
  function showModal() {
    setModalIsActive(true);
  }

  function closeModal() {
    setModalIsActive(false);
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

  const setPoint = (evt: any) => {
    if (keyCode !== 'Space') {
      const svg = document.querySelector('.main-svg');
      if (!svg) return;
      // @ts-expect-error
      const pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      // @ts-expect-error
      const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
      const element = getMapElements(
        cursorPoint.x,
        cursorPoint.y,
        mapReducer.selectedElement,
      );
      if (mapReducer.selectedElement) showModal();
      setLocationArr([
        ...locationArr,
        <MapItem
          xCoord={cursorPoint.x}
          yCoord={cursorPoint.y}
          element={element}
          getSVGCoord={(x: number, y: number) => getSVGCoord(x, y)}
        />,
      ]);
    }
  };

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
      {console.log(JSON.stringify(mapReducer.selectedElement))}
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
        </svg>
        <button onClick={() => zoom(0.5)} type="button">
          Zoom In
        </button>
        <button onClick={() => zoom(2)} type="button">
          Zoom Out
        </button>
      </div>
      <PointSelection />
      <Modal modalIsActive={modalIsActive} closeModal={() => closeModal()} />
    </div>
  );
}
