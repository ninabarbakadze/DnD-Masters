// eslint-disable-next-line
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { IRootState } from '../../../reducers';
import PointSelection from '../PointSelection/PointSelection';
import MapItem from '../MapItem/MapItem';
import Modal from '../Modal/Modal';
import getMapElements from '../../../assets/mapElements/mapData';
import { updateElementArr } from '../../../actions/mapWizard.action';
import { iElement } from '../../../interfaces/map.interface';

export default function MapEdit() {
  const dispatch = useDispatch();

  const imgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mapReducer = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [pointerOrigin, setPointerOrigin] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({
    x: -600,
    y: -300,
    width: 1200,
    height: 600,
  });
  const [newViewBox, setNewViewBox] = useState({
    x: -600,
    y: -300,
    width: 1200,
    height: 600,
  });
  const [viewBoxString, setViewBoxString] = useState('-600 -300 1200 600');
  const [locationArr, setLocationArr] = useState<JSX.Element[]>([]);
  const [keyCode, setKeyCode] = useState('');
  const [modalIsActive, setModalIsActive] = useState(false);
  const [svgCoord, setSvgCoord] = useState({ x: 0, y: 0 });
  const [elementArr, setElmentArr] = useState<iElement[]>([]);

  // Create Id
  function generateId() {
    const id = Math.random().toString(16).slice(2);
    return id;
  }

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
    setViewBox({
      x: newViewBox.x,
      y: newViewBox.y,
      width: newViewBox.width,
      height: newViewBox.height,
    });
  }

  // Zoom

  async function zoom(level: number) {
    const { width, height } = newViewBox;
    const zoomedViewBox = {
      ...newViewBox,
      width: width * level,
      height: height * level,
    };
    const test = `${zoomedViewBox.x} ${zoomedViewBox.y} ${zoomedViewBox.width} ${zoomedViewBox.height}`;
    await gsap.to('.main-svg', 0.3, { attr: { viewBox: test } });
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

  async function onModalSubmit(
    locationName: string,
    locationDescription: string,
  ) {
    const element = getMapElements(
      svgCoord.x,
      svgCoord.y,
      mapReducer.selectedElement,
    );
    const id = generateId();
    setLocationArr([
      ...locationArr,
      <MapItem
        id={id}
        locationName={locationName}
        locationDescription={locationDescription}
        xCoord={svgCoord.x}
        yCoord={svgCoord.y}
        element={element}
        getSVGCoord={(x: number, y: number) => getSVGCoord(x, y)}
      />,
    ]);
    const dataObj = {
      id,
      elementName: mapReducer.selectedElement,
      x: svgCoord.x,
      y: svgCoord.y,
      title: locationName,
      description: locationDescription,
    };
    setElmentArr([...elementArr, dataObj]);
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
      setSvgCoord(cursorPoint);
      if (mapReducer.selectedElement) showModal();
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

  useEffect(() => {
    dispatch(updateElementArr({ elementArr }));
  }, [elementArr]);

  function handleSave() {
    console.log('Map saved');
  }

  useLayoutEffect(() => {
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
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
          width="100%"
          height="100%"
          viewBox={viewBoxString}
        >
          <foreignObject
            width={dimensions.width}
            height={dimensions.height}
            y={-dimensions.height / 2}
            x={-dimensions.width / 2}
          >
            <img
              ref={imgRef}
              src="https://i.redd.it/pq61m18mmzp51.jpg"
              alt=""
            />
          </foreignObject>
          {/* <image
            ref={imgRef}
            className="map-image"
            height="1000px"
            preserveAspectRatio="xMidYMid meet"
            href="https://i.redd.it/pq61m18mmzp51.jpg"
          /> */}
          {locationArr}
        </svg>
        <button onClick={() => zoom(0.8)} type="button">
          Zoom In
        </button>
        <button onClick={() => zoom(1.25)} type="button">
          Zoom Out
        </button>
        <button type="button" onClick={handleSave}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
        </button>
        <p>{dimensions.width}</p>
        <p>{dimensions.height}</p>
        {console.log(dimensions.width)}
      </div>
      <PointSelection />
      <Modal
        modalIsActive={modalIsActive}
        // eslint-disable-next-line
        onModalSubmit={onModalSubmit}
        setModalIsActive={setModalIsActive}
        closeModal={() => closeModal()}
      />
    </div>
  );
}
