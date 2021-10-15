export default function MapSelectionItem({ element, handleClick }: any) {
  return (
    <div className="element-presentation">
      <svg
        onClick={handleClick}
        className="svg-element-presentation"
        width="100%"
        height="100%"
      >
        {element}
      </svg>
    </div>
  );
}
