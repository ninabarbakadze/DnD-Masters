// eslint-disable-next-line
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import {
  updateElementArr,
  setCurrentDescription,
} from '../../../actions/mapWizard.action';
import { IRootState } from '../../../reducers';

gsap.registerPlugin(Draggable);
export default function MapItem({
  xCoord,
  yCoord,
  getSVGCoord,
  element,
  locationName,
  locationDescription,
  id,
  deleteLocation,
}: any) {
  const [textWidth, setTextWidth] = useState(0);
  const dispatch = useDispatch();
  const { elementArr, shouldDelete, locationArr } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );

  function showDescription() {
    dispatch(
      setCurrentDescription({
        currentDescription: locationDescription,
        currentName: locationName,
      }),
    );
  }

  function hideDescription() {
    dispatch(
      setCurrentDescription({ currentDescription: '', currentName: '' }),
    );
  }

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
  }, []);

  return (
    <g
      onClick={
        () =>
          // eslint-disable-next-line
          shouldDelete && deleteLocation(id, locationArr, elementArr)
        // eslint-disable-next-line
      }
      onMouseEnter={showDescription}
      onMouseLeave={hideDescription}
      transform={`translate(${xCoord} ${yCoord})`}
      className="draggable"
    >
      <rect width="100" height="150" opacity="0.0" x="-50" y="-100" />
      {element}
      <text
        data-id={id}
        x={-textWidth / 2}
        y="40"
        fill="white"
        fontSize="24"
        fontWeight="bold"
      >
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
