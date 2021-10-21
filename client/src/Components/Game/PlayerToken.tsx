// eslint-disable-next-line
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { updatePlayer } from '../../actions/gameWizard.actions';
import { IRootState } from '../../reducers';

// import {
//   updateElementArr,
//   setCurrentDescription,
// } from '../../../actions/mapWizard.action';
// import { IRootState } from '../../../reducers';

gsap.registerPlugin(Draggable);

export default function PlayerToken({
  xCoord,
  yCoord,
  playerName,
  getSVGCoord,
}: any) {
  const dispatch = useDispatch();
  const { playerArr } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  useEffect(() => {
    Draggable.create('.draggable', {
      onDragEnd: (e: any) => {
        const name = e.path[1].children[1].innerHTML;
        const coords = getSVGCoord(e.x, e.y);
        if (playerArr) {
          const index = playerArr.findIndex((el) => el.playerName === name);
          // console.log(playerName);
          const playerArrCopy = [...playerArr];
          playerArrCopy[index].position.x = coords.x;
          playerArrCopy[index].position.y = coords.y;
          dispatch(updatePlayer({ playerArr: playerArrCopy }));
        }
      },
    });
  }, []);

  // useLayoutEffect(() => {
  //   const textElement = document.querySelector(`text[data-id="${id}"]`);
  //   // @ts-expect-error
  //   const bbox = textElement?.getBBox();
  //   setTextWidth(bbox.width);
  // }, []);

  return (
    <g transform={`translate(${xCoord} ${yCoord})`} className="draggable">
      {console.log(playerArr)}
      <circle r="50" cx="50" cy="50" fill="blue" />
      <text x="50" y="50" fill="white">
        {playerName}
        {console.log(playerName)}
      </text>
    </g>
  );
}
