import { useState, useEffect, useRef } from 'react';

export default function MapSelectionItem({ element, selectItem }: any) {
  const node = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = (e: any) => {
    selectItem(e);
    setIsSelected(true);
  };

  const outsideClick = (e: any) => {
    if (!node.current) return;
    // @ts-expect-error
    if (node.current.contains(e.target)) {
      return;
    }
    setIsSelected(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, []);

  return (
    <div>
      <svg
        ref={node}
        onClick={handleClick}
        className={isSelected ? 'isSelected' : ''}
        width="100%"
        height="100%"
      >
        {element}
      </svg>
    </div>
  );
}
