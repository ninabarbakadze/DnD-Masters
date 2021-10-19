import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMaps, deleteMap } from '../../../services/map.service';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../MapCarouselItem/MapCarouselItem';
import './MapSteps.scss';
import { updateMapNameAndId } from '../../../actions/mapWizard.action';

export default function MapSelection({ history }: any) {
  const [refresh, doRefresh] = useState(0);
  const dispatch = useDispatch();
  const [mapArr, setMapArr] = useState<any>([]);
  const [mapIndex, setMapIndex] = useState(0);
  const [images, setImages] = useState([
    'https://endlessicons.com/wp-content/uploads/2012/12/add-icon-614x460.png',
  ]);
  const [items, setItems] = useState<JSX.Element[]>([]);

  const nextPage = () => {
    if (mapIndex === 0) {
      history.push('/mapWizard/mapUpload');
    } else {
      dispatch(
        updateMapNameAndId({
          mapName: mapArr[mapIndex - 1].mapName,
          // eslint-disable-next-line
          mapId: mapArr[mapIndex - 1]._id,
          mapUrl: mapArr[mapIndex - 1].mapUrl,
        }),
      );
      history.push('/mapWizard/mapEdit');
    }
  };

  async function getMaps() {
    const loadedMaps = await getAllMaps('ruso');
    setMapArr(loadedMaps);
    setImages([images[0], ...loadedMaps.map((map: any) => map.mapUrl)]);
  }

  const onDelete = async () => {
    // eslint-disable-next-line
    const id = mapArr[mapIndex - 1]._id;
    await deleteMap('ruso', id);
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
    </div>
  );
}
