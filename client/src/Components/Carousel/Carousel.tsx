import { useState, useEffect } from 'react';
import './Carousel.scss';

export default function Carousel(props: any) {
  const { children, show, setMapIndex } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
      setMapIndex((prevIndex: number) => prevIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setMapIndex((prevIndex: number) => prevIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      {console.log(children)}
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button onClick={prev} className="left-arrow" type="button">
            &lt;
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - show && (
          <button onClick={next} className="right-arrow" type="button">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
