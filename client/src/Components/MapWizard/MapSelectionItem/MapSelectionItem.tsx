import { useState, useEffect, useRef } from 'react';

interface props {
  element: JSX.Element;
  selectItem(elementName: string): void;
  elementName: string;
}

const MapSelectionItem = ({
  element,
  selectItem,
  elementName,
}: props): JSX.Element => {
  const node = useRef<any>(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    selectItem(elementName);
    setIsSelected(true);
  };

  const outsideClick = (e: Event) => {
    if (!node.current) return;
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
    <button type="button" onClick={handleClick} className="element-presentation">
      <svg
        ref={node}
        className={
          isSelected ? 'isSelected non-click-layer' : 'non-click-layer'
        }
        width="100"
        height="100"
      >
        {element}
      </svg>
    </button>
  );
};

export default MapSelectionItem;
