import { useEffect, useState } from 'react';
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
  locationDescription,
  id,
  deleteLocation,
}: any) {
  const dispatch = useDispatch();
  const { elementArr, shouldDelete, locationArr } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  const [isHovered, setIsHovered] = useState(false);

  function showDescription() {
    setIsHovered(true);
  }

  function hideDescription() {
    setIsHovered(false);
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

  return (
    <g
      onClick={() => shouldDelete && deleteLocation(id, locationArr)}
      onMouseEnter={showDescription}
      onMouseLeave={hideDescription}
      transform={`translate(${xCoord} ${yCoord})`}
      className="draggable"
    >
      {element}
      <text>{locationName}</text>
      <foreignObject width="100" height="50">
        <div
          className={
            isHovered ? 'description-text' : 'not-visible description-text'
          }
        >
          {locationDescription}
        </div>
      </foreignObject>
    </g>
  );
}
