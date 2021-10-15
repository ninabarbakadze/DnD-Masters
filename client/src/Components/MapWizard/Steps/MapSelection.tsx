import { useState } from 'react';
import Carousel from '../../Carousel/Carousel';
import MapCarouselItem from '../MapCarouselItem/MapCarouselItem';
import './MapSteps.scss';

export default function MapSelection({ history }: any) {
  const [mapIndex, setMapIndex] = useState(0);
  const maps = [
    <MapCarouselItem name="Box1" />,
    <MapCarouselItem name="Box2" />,
    <MapCarouselItem name="Box3" />,
    <MapCarouselItem name="Box4" />,
    <MapCarouselItem name="Box5" />,
    <MapCarouselItem name="Box6" />,
  ];

  const nextPage = () => {
    if (mapIndex === 0) {
      history.push('/mapWizard/mapUpload');
    } else {
      history.push('/mapWizard/mapEdit');
    }
  };

  return (
    <div>
      <h1>{maps[mapIndex].props.name}</h1>
      <div>{maps[mapIndex]}</div>
      <Carousel setMapIndex={setMapIndex} show={3}>
        {maps}
      </Carousel>
      <button onClick={nextPage} type="button">
        {mapIndex === 0 ? 'Create Map' : 'Edit Map'}
      </button>
      {mapIndex > 0 && <button type="button">Delete Map</button>}
    </div>
  );
}
