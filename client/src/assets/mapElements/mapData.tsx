// @ts-nocheck
// interface iMapElements {
//   element1: string;
//   element2: string;
// }

function getMapElements(x: number, y: number, name: any): any {
  const mapElements = {
    element1: <circle className="draggable" r="50" cx={x} cy={y} fill="red" />,
    element2: (
      <rect
        className="draggable"
        width="100"
        height="100"
        x={x}
        y={y}
        fill="blue"
      />
    ),
  };

  const element = mapElements[name];
  console.log('in function', element);
  return element;
}

export default getMapElements;
