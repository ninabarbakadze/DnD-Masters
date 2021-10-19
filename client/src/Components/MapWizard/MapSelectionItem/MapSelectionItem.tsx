// eslint-disable-next-line
import { useState, useEffect, useRef } from 'react';

export default function MapSelectionItem({
  element,
  selectItem,
  elementName,
}: any) {
  const node = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    selectItem(elementName);
    setIsSelected(true);
  };

  const outsideClick = (e: any) => {
    // console.log(e.target.classList.contains('main-svg'));
    if (!node.current) return;
    // @ts-expect-error
    if (node.current.contains(e.target)) return;
    setIsSelected(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, []);

  return (
    // eslint-disable-next-line
    <div onClick={handleClick} className="element-presentation">
      {/* {console.log(element.props.dataset)} */}
      <svg
        ref={node}
        // onClick={handleClick}
        className={
          isSelected ? 'isSelected non-click-layer' : 'non-click-layer'
        }
        width="100"
        height="100"
      >
        {element}
      </svg>
    </div>
  );
}
