import { useState, useEffect } from 'react';
import './Carousel.scss';

export default function Carousel(props: any) {
  const { children, show, setIndex } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      setIndex((prevIndex: number) => prevIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setIndex((prevIndex: number) => prevIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <svg
            className="left-arrow"
            width="16"
            height="16"
            fill="currentColor"
            onClick={prev}
            viewBox="0 0 16 16"
          >
            {/* eslint-disable-next-line */}
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
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
        {currentIndex < length - 1 && (
          <svg
            className="right-arrow"
            onClick={next}
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            {/* eslint-disable-next-line */}
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        )}
      </div>
    </div>
  );
}
