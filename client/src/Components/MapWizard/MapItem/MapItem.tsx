// eslint-disable-next-line
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { updateElementArr } from '../../../actions/mapWizard.action';
import { IRootState } from '../../../reducers';

gsap.registerPlugin(Draggable);
export default function MapItem({
  xCoord,
  yCoord,
  getSVGCoord,
  element,
  locationName,
  // locationDescription,
  id,
  deleteLocation,
}: any) {
  const [textWidth, setTextWidth] = useState(0);
  const dispatch = useDispatch();
  const { elementArr, shouldDelete, locationArr } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  // const [isHovered, setIsHovered] = useState(false);

  // function showDescription() {
  //   setIsHovered(true);
  // }

  // function hideDescription() {
  //   setIsHovered(false);
  // }

  useEffect(() => {
    Draggable.create('.draggable', {
      onDragEnd: (e: any) => {
        const coords = getSVGCoord(e.x, e.y);
        if (elementArr) {
          const index = elementArr.findIndex((el) => el.id === id);
          const elementArrCopy = [...elementArr];
          elementArrCopy[index].x = coords.x;
          elementArrCopy[index].y = coords.y;
          dispatch(updateElementArr({ elementArr: elementArrCopy }));
        }
      },
    });
  }, [elementArr]);

  useLayoutEffect(() => {
    const textElement = document.querySelector(`text[data-id="${id}"]`);
    // @ts-expect-error
    const bbox = textElement?.getBBox();
    setTextWidth(bbox.width);
    console.log(bbox.width);
  }, []);

  return (
    <g
      onClick={
        () =>
          // eslint-disable-next-line
          shouldDelete && deleteLocation(id, locationArr, elementArr)
        // eslint-disable-next-line
      }
      // onMouseEnter={showDescription}
      // onMouseLeave={hideDescription}
      transform={`translate(${xCoord} ${yCoord})`}
      className="draggable"
    >
      {element}
      <text data-id={id} x={-textWidth / 2} y="4%" fill="white" fontSize="24">
        {locationName}
      </text>
      {/* <foreignObject width="100" height="50" x="-40" y="-70">
        <div
          className={
            isHovered ? 'description-text' : 'not-visible description-text'
          }
        >
          {locationDescription}
        </div>
      </foreignObject> */}
    </g>
  );
}
