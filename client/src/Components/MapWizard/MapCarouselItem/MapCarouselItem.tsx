interface props {
  url: string;
}

const MapCarouselItem = ({ url }: props) => (
  <div className="map-carousel-item-container">
    <img className="map-carousel-item" src={url} alt="" />
  </div>
);

export default MapCarouselItem;
