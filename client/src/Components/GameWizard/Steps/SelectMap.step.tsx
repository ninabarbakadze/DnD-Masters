import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../../MapWizard/MapCarouselItem/MapCarouselItem';
import { getAllMaps } from '../../../services/map.service';
import { updateMap } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { PayloadAction } from '../../../interfaces/redux.interface';
import { iGameWizardState } from '../../../reducers/gameCreation.reducer';
import { iLoadedMap } from '../../../interfaces/map.interface';

interface props {
  path: string;
  onSubmit(data: iGameWizardState,
    payLoadAction: PayloadAction<iGameWizardState>,
    path?: string,): void;
}

const SelectMap = ({ onSubmit, path }: props) => {
  const [mapIndex, setMapIndex] = useState(0);
  const [mapArr, setMapArr] = useState<iLoadedMap[]>([]);
  const [items, setItems] = useState<JSX.Element[]>([]);
  const user = useSelector((state: IRootState) => state.userReducer);

  const nextPage = () => {
    onSubmit(
      { mapId: mapArr[mapIndex]._id, mapUrl: mapArr[mapIndex].mapUrl, playerArr: [] },
      updateMap,
      path,
    );
  };

  async function getMaps() {
    const loadedMaps = await getAllMaps(user.name);
    setMapArr(loadedMaps);
    setItems(
      loadedMaps.map((map: any) => (
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
};

export default SelectMap;
