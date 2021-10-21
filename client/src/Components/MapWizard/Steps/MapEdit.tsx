/* eslint-disable max-len */
// eslint-disable-next-line
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { IRootState } from '../../../reducers';
import PointSelection from '../PointSelection/PointSelection';
import ElementForm from '../Modal/ModalForms/ElementForm';
import SaveForm from '../Modal/ModalForms/SaveForm';
import MapItem from '../MapItem/MapItem';
import Modal from '../Modal/Modal';
import InfoModal from '../../InfoModal/InfoModal';
import DescriptionPreview from '../DescriptionPreview/DescriptionPreview';
import getMapElements from '../../../assets/mapElements/mapData';
import {
  updateElementArr,
  updateLocationArr,
} from '../../../actions/mapWizard.action';
import { iElement } from '../../../interfaces/map.interface';
import { saveMap, updateMap } from '../../../services/map.service';

export default function MapEdit() {
  const dispatch = useDispatch();

  const imgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  // eslint-disable-next-line
  const { selectedElement, locationArr, elementArr, mapUrl, mapName, mapId } =
    useSelector((state: IRootState) => state.mapCreationReducer);
  const username = useSelector((state: IRootState) => state.user);
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

  const [keyCode, setKeyCode] = useState('');
  const [elementModalIsActive, setElementModalIsActive] = useState(false);
  const [saveModalIsActive, setSaveModalIsActive] = useState(false);
  const [svgCoord, setSvgCoord] = useState({ x: 0, y: 0 });
  const [isModal, setIsModal] = useState(false);

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
    // eslint-disable-next-line
    const { width, height, x, y } = newViewBox;
    const zoomedViewBox = {
      x: x + (width - width * level) / 2,
      y: y + (height - height * level) / 2,
      width: width * level,
      height: height * level,
    };
    const test = `${zoomedViewBox.x} ${zoomedViewBox.y} ${zoomedViewBox.width} ${zoomedViewBox.height}`;
    await gsap.to('.main-svg', 0.3, { attr: { viewBox: test } });
    setNewViewBox(zoomedViewBox);
    setViewBox(zoomedViewBox);
  }

  // Create Modal for further information
  function showElementModal() {
    setElementModalIsActive(true);
  }

  function closeElementModal() {
    setElementModalIsActive(false);
  }

  function showSaveModal() {
    setSaveModalIsActive(true);
  }

  function closeSaveModal() {
    setSaveModalIsActive(false);
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

  function deleteLocation(
    id: string,
    locArr: JSX.Element[],
    elArr: iElement[],
  ) {
    const locationArrIndex = locArr.findIndex(
      (location) => location.props.id === id,
    );
    const elementArrIndex = elArr.findIndex((element) => element.id === id);
    dispatch(
      updateLocationArr({
        locationArr: [
          ...locArr.slice(0, locationArrIndex),
          ...locArr.slice(locationArrIndex + 1),
        ],
      }),
    );
    dispatch(
      updateElementArr({
        elementArr: [
          ...elArr.slice(0, elementArrIndex),
          ...elArr.slice(elementArrIndex + 1),
        ],
      }),
    );
  }

  function onElementModalSubmit(
    locationName: string,
    locationDescription: string,
  ) {
    if (!elementArr) return;
    const element = getMapElements(svgCoord.x, svgCoord.y, selectedElement);
    const id = generateId();
    dispatch(
      updateLocationArr({
        locationArr: [
          // @ts-expect-error
          ...locationArr,
          <MapItem
            // eslint-disable-next-line
            deleteLocation={deleteLocation}
            id={id}
            locationName={locationName}
            locationDescription={locationDescription}
            xCoord={svgCoord.x}
            yCoord={svgCoord.y}
            element={element}
            getSVGCoord={(x: number, y: number) => getSVGCoord(x, y)}
            Key={id}
          />,
        ],
      }),
    );
    const dataObj = {
      id,
      elementName: selectedElement,
      x: svgCoord.x,
      y: svgCoord.y,
      title: locationName,
      description: locationDescription,
    };
    dispatch(updateElementArr({ elementArr: [...elementArr, dataObj] }));
  }

  async function onSaveModalSubmit(name: string) {
    if (!username.name || !mapUrl) return;
    const data = {
      mapName: name,
      mapUrl,
      locationData: JSON.stringify(elementArr),
    };
    if (name === mapName) {
      if (!mapId) return;
      await updateMap(username.name, mapId, data);
    } else {
      await saveMap(username.name, data);
    }
    setIsModal(!isModal);
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
      if (selectedElement) showElementModal();
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

  function handleSave() {
    showSaveModal();
  }

  function toggleModal() {
    setIsModal(!isModal);
  }

  // useEffect(() => {
  //   // const bbox = document.querySelector('.test')?.getBBox();
  //   setTimeout(() => {
  //     console.log(imgRef.current.getBoundingClientRect().width);
  //     setDimensions({
  //       width: imgRef.current.getBoundingClientRect().width,
  //       height: imgRef.current.getBoundingClientRect().height,
  //     });
  //   }, 1);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      const bbox = document.querySelector('.test')?.getBBox();
      setDimensions({
        width: bbox.width,
        height: bbox.height,
      });
    }, 1000);
  }, [imgRef.current]);

  useEffect(() => {
    if (!elementArr) return;
    const locations = elementArr.map((element) => {
      const el = getMapElements(element.x, element.y, element.elementName);
      return (
        <MapItem
          // eslint-disable-next-line
          deleteLocation={deleteLocation}
          id={element.id}
          locationName={element.elementName}
          locationDescription={element.description}
          xCoord={element.x}
          yCoord={element.y}
          element={el}
          getSVGCoord={(x: number, y: number) => getSVGCoord(x, y)}
        />
      );
    });
    dispatch(updateLocationArr({ locationArr: locations }));
  }, []);

  return (
    <div className="map-edit-container">
      <div className="map-edit-image">
        {/* <img src={mapUrl} alt="" /> */}
        <div>
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
            <image
              className="test"
              x={-dimensions.width / 2}
              y={-dimensions.height / 2}
              ref={imgRef}
              href={mapUrl}
            />
            {/* <foreignObject
            width={dimensions.width}
            height={dimensions.height}
            y={-dimensions.height / 2}
            x={-dimensions.width / 2}
          >
            <img
              className="test"
              // ref={imgRef}
              // eslint-disable-next-line
              src={mapUrl}
              alt=""
            />
          </foreignObject> */}
            {locationArr}
          </svg>
        </div>
        <div className="map-edit-buttons">
          <div>
            <button
              className="map-zoom-button"
              onClick={() => zoom(0.8)}
              type="button"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
            <button
              className="map-zoom-button"
              onClick={() => zoom(1.25)}
              type="button"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </div>
          <button
            className="map-save-button"
            type="button"
            onClick={handleSave}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              {/* eslint-disable-next-line */}
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              {/* eslint-disable-next-line */}
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
          </button>
        </div>
      </div>
      {/* eslint-disable-next-line */}
      <div className="map-edit-menu">
        <PointSelection />
        <DescriptionPreview />
      </div>
      <Modal
        heading="Name your Elements"
        modalIsActive={elementModalIsActive}
        // eslint-disable-next-line
        setModalIsActive={setElementModalIsActive}
        closeModal={() => closeElementModal()}
      >
        <ElementForm
          // eslint-disable-next-line
          onModalSubmit={onElementModalSubmit}
          setModalIsActive={setElementModalIsActive}
        />
      </Modal>
      <Modal
        heading="Save your Map"
        modalIsActive={saveModalIsActive}
        closeModal={() => closeSaveModal()}
      >
        <SaveForm
          setModalIsActive={setSaveModalIsActive}
          // eslint-disable-next-line
          onModalSubmit={onSaveModalSubmit}
        />
      </Modal>
      <InfoModal
        isVisible={isModal}
        // eslint-disable-next-line
        setIsVisible={toggleModal}
        message="Map saved"
        type="success"
      />
    </div>
  );
}
