import { useState } from 'react';
import Carousel from '../../Carousel/Carousel';
import './MapSteps.scss';

export default function MapSelection() {
  const [mapIndex, setMapIndex] = useState(0);
  return (
    <div>
      <h1>
        Map Name:
        {mapIndex}
      </h1>
      <h2>Map Image</h2>
      <Carousel setMapIndex={setMapIndex} show={3}>
        <div className="box-container">
          <div className="box">Box1</div>
        </div>
        <div className="box-container">
          <div className="box">Box2</div>
        </div>
        <div className="box-container">
          <div className="box">Box3</div>
        </div>
        <div className="box-container">
          <div className="box">Box4</div>
        </div>
        <div className="box-container">
          <div className="box">Box5</div>
        </div>
        <div className="box-container">
          <div className="box">Box6</div>
        </div>
      </Carousel>
    </div>
  );
}
