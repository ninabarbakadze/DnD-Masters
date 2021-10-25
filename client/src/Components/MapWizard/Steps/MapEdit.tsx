import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  MouseEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { IRootState } from '../../../reducers';
import PointSelection from '../PointSelection/PointSelection';
import ElementForm from '../Modal/ModalForms/ElementForm';
import SaveForm from '../Modal/ModalForms/SaveForm';
import MapItem from '../MapItem/MapItem';
import Modal from '../Modal/Modal';
import InfoBanner from '../../InfoBanner/InfoBanner';
import DescriptionPreview from '../DescriptionPreview/DescriptionPreview';
import getMapElements from '../../../assets/mapElements/mapData';
import {
  updateElementArr,
  updateLocationArr,
} from '../../../actions/mapWizard.action';
import { iElement } from '../../../interfaces/map.interface';
import { saveMap, updateMap } from '../../../services/map.service';
import svgIcons from '../../../assets/svgElements/svgIcons';

const MapEdit = () => {
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
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

  function generateId() {
    const id = Math.random().toString(16).slice(2);
    return id;
  }

  // Map Panning

  const getPointFromEvent = (evt: MouseEvent) => {
    const point = { x: 0, y: 0 };
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  };

  const onPointerDown = (evt: MouseEvent<SVGSVGElement>) => {
    if (keyCode === 'Space') {
      setIsPointerDown(true);
      const pointerPosition = getPointFromEvent(evt);
      setPointerOrigin({ x: pointerPosition.x, y: pointerPosition.y });
    }
  };

  const onPointerMove = (evt: MouseEvent) => {
    if (!isPointerDown) return;
    evt.preventDefault();
    const pointerPosition = getPointFromEvent(evt);
    setNewViewBox({
      x: viewBox.x - (pointerPosition.x - pointerOrigin.x),
      y: viewBox.y - (pointerPosition.y - pointerOrigin.y),
      width: viewBox.width,
      height: viewBox.height,
    });
  };

  const onPointerUp = () => {
    setIsPointerDown(false);
    setViewBox({
      x: newViewBox.x,
      y: newViewBox.y,
      width: newViewBox.width,
      height: newViewBox.height,
    });
  };

  // Zoom in Map

  const zoom = async (level: number) => {
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
  };

  // Create Modal for further information
  const showElementModal = () => {
    setElementModalIsActive(true);
  };

  const closeElementModal = () => {
    setElementModalIsActive(false);
  };

  const showSaveModal = () => {
    setSaveModalIsActive(true);
  };

  const closeSaveModal = () => {
    setSaveModalIsActive(false);
  };

  // Point
  const getSVGCoord = (x: number, y: number) => {
    const svg = document.querySelector('.main-svg');
    if (!svg) return {};
    // @ts-expect-error
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    // @ts-expect-error
    const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    return cursorPoint;
  };

  const deleteLocation = (
    id: string,
    locArr: JSX.Element[],
    elArr: iElement[],
  ) => {
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
  };

  const onElementModalSubmit = (
    locationName: string,
    locationDescription: string,
  ) => {
    if (!elementArr || !locationArr) return;
    const element = getMapElements(svgCoord.x, svgCoord.y, selectedElement);
    const id = generateId();
    dispatch(
      updateLocationArr({
        locationArr: [
          ...locationArr,
          <MapItem
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
  };

  const onSaveModalSubmit = async (name: string) => {
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
  };

  const setPoint = (evt: MouseEvent) => {
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

  const handleSave = () => {
    showSaveModal();
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

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
              {svgIcons.zoomIn}
            </button>
            <button
              className="map-zoom-button"
              onClick={() => zoom(1.25)}
              type="button"
            >
              {svgIcons.zoomOut}
            </button>
          </div>
          <button
            className="map-save-button"
            type="button"
            onClick={handleSave}
          >
            {svgIcons.save}
          </button>
        </div>
      </div>
      <div className="map-edit-menu">
        <PointSelection />
        <DescriptionPreview />
      </div>
      <Modal
        heading="Name your Elements"
        modalIsActive={elementModalIsActive}
        setModalIsActive={setElementModalIsActive}
        closeModal={() => closeElementModal()}
      >
        <ElementForm
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
          onModalSubmit={onSaveModalSubmit}
        />
      </Modal>
      <InfoBanner
        isVisible={isModal}
        setIsVisible={toggleModal}
        message="Map saved"
        type="success"
      />
    </div>
  );
};

export default MapEdit;
