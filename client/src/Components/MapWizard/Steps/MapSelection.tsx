import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaps, deleteMap, getMap } from '../../../services/map.service';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../MapCarouselItem/MapCarouselItem';
import InfoModal from '../../InfoBanner/InfoBanner';
import './MapSteps.scss';
import {
  updateMapNameAndId,
  updateElementArr,
} from '../../../actions/mapWizard.action';
import { IRootState } from '../../../reducers';

export default function MapSelection({ history }: any) {
  const [refresh, doRefresh] = useState(0);
  const dispatch = useDispatch();
  const [mapArr, setMapArr] = useState<any>([]);
  const [mapIndex, setMapIndex] = useState(0);
  const [images, setImages] = useState([
    'https://endlessicons.com/wp-content/uploads/2012/12/add-icon-614x460.png',
  ]);
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [isModal, setIsModal] = useState(false);
  const user = useSelector((state: IRootState) => state.user);

  const nextPage = async () => {
    if (mapIndex === 0) {
      history.push('/mapWizard/mapUpload');
    } else {
      // eslint-disable-next-line
      const { mapName, mapId, mapUrl, locationData } = await getMap(
        user.name,
        // eslint-disable-next-line
        mapArr[mapIndex - 1]._id,
      );
      dispatch(
        updateMapNameAndId({
          mapName,
          // eslint-disable-next-line
          mapId: mapArr[mapIndex - 1]._id,
          mapUrl,
        }),
      );
      // console.log(JSON.parse(locationData));
      dispatch(updateElementArr({ elementArr: JSON.parse(locationData) }));
      history.push('/mapWizard/mapEdit');
    }
  };

  async function getMaps() {
    const loadedMaps = await getAllMaps(user.name);
    setMapArr(loadedMaps);
    setImages([images[0], ...loadedMaps.map((map: any) => map.mapUrl)]);
  }

  const onDelete = async () => {
    // eslint-disable-next-line
    const id = mapArr[mapIndex - 1]._id;
    await deleteMap(user.name, id);
    setIsModal(!isModal);
    doRefresh((prev) => prev + 1);
    await getMaps();
  };

  useEffect(() => {
    getMaps();
  }, []);

  useEffect(() => {
    const itemArr = images.map((image) => <MapCarouselItem url={image} />);
    setItems(itemArr);
  }, [images]);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="map-selection-container">
      <div className="map-carousel-preview-container">
        <h1 className="map-carousel-preview-container-title">
          {mapIndex === 0 ? 'Create New Map' : mapArr[mapIndex - 1]?.mapName}
        </h1>
        <img className="map-carousel-preview" src={images[mapIndex]} alt="" />
      </div>
      <div>
        <button
          className="main-button success-button"
          onClick={nextPage}
          type="button"
        >
          {mapIndex === 0 ? 'Create Map' : 'Edit Map'}
        </button>
        {mapIndex > 0 && (
          <button
            onClick={onDelete}
            className="side-button danger-button"
            type="button"
          >
            Delete Map
          </button>
        )}
      </div>
      <Carousel setIndex={setMapIndex} refresh={refresh} show={5}>
        {items}
      </Carousel>
      <InfoModal
        message="Map deleted"
        type="success"
        isVisible={isModal}
        setIsVisible={toggleModal}
      />
    </div>
  );
}
