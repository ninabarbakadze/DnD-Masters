// @ts-nocheck
// interface iMapElements {
//   element1: string;
//   element2: string;
// }

function getMapElements(x: number, y: number, name: any): any {
  const mapElements = {
    element1: <circle r="50" fill="red" />,
    element2: <rect width="100" height="100" fill="blue" />,
    element3: (
      <path
        transform="scale(5,5)"
        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        fill="black"
      />
    ),
  };

  const element = mapElements[name];
  return element;
}

export default getMapElements;
