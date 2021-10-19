/* eslint-disable */
// @ts-nocheck
import { useEffect, useRef } from 'react';
import './attributesSelection.scss';

interface props {
  name: string;
  handleClick: any;
  bonus: number;
  selected: boolean;
}

const AbilityBonusChoice = ({ name, handleClick, selected }: props) => {
  return (
    <div
      className={`abilityBonusChoice inline-block h-10 w-12 rounded-xl ${
        selected ? 'bg-gray-400 shadow-innder' : ''
      } shadow-lg place-content-center hover:bg-gray-300 hover:shadow-inner`}
      onClick={() => {
        handleClick(name);
      }}
    >
      <p className="inline-block align-middle">{name}</p>
    </div>
  );
};

export default AbilityBonusChoice;
