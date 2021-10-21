import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../../MapWizard/MapCarouselItem/MapCarouselItem';
import { getAllMaps } from '../../../services/map.service';
import { updateMap } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';

function SelectMap({ onSubmit, path }: any) {
  const [mapIndex, setMapIndex] = useState(0);
  const [mapArr, setMapArr] = useState<any>([]);
  const [items, setItems] = useState<JSX.Element[]>([]);
  const user = useSelector((state: IRootState) => state.user);

  const nextPage = () => {
    onSubmit(
      // eslint-disable-next-line
      { mapId: mapArr[mapIndex]._id, mapUrl: mapArr[mapIndex].mapUrl },
      updateMap,
      path,
    );
  };

  async function getMaps() {
    const loadedMaps = await getAllMaps(user.name);
    setMapArr(loadedMaps);
    setItems(
      loadedMaps.map((map: any) => (
        // eslint-disable-next-line
        <MapCarouselItem url={map.mapUrl} key={map._id} />
      )),
    );
  }

  useEffect(() => {
    getMaps();
  }, []);

  return (
    <div className="map-selection-container">
      <div className="map-carousel-preview-container">
        <h1 className="map-carousel-preview-container-title">
          {mapArr[mapIndex]?.mapName}
        </h1>
        <img
          className="map-carousel-preview"
          src={mapArr[mapIndex]?.mapUrl}
          alt=""
        />
      </div>
      <div>
        <button className="main-button" onClick={nextPage} type="button">
          Choose
        </button>
      </div>
      <div>
        <Carousel setIndex={setMapIndex} show={5}>
          {items}
        </Carousel>
      </div>
    </div>
  );
}

export default withRouter(SelectMap);
