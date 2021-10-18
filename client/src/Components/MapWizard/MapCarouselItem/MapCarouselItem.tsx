export default function MapCarouselItem({ url }: any) {
  return (
    <div className="map-carousel-item-container">
      <img className="map-carousel-item" src={url} alt="" />
    </div>
  );
}
