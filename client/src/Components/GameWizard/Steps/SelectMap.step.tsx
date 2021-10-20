import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../../MapWizard/MapCarouselItem/MapCarouselItem';
import { getAllMaps } from '../../../services/map.service';

function SelectMap({ onSubmit, path }: any) {
  const [mapIndex, setMapIndex] = useState(0);
  const [mapArr, setMapArr] = useState<any>([]);
  // const [images, setImages] = useState<string[]>([]);
  const [items, setItems] = useState<JSX.Element[]>([]);

  const nextPage = () => {
    alert('selecte');
    onSubmit(path);
  };

  async function getMaps() {
    const loadedMaps = await getAllMaps('ruso');
    setMapArr(loadedMaps);
    setItems(
      loadedMaps.map((map: any) => <MapCarouselItem url={map.mapUrl} />),
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
