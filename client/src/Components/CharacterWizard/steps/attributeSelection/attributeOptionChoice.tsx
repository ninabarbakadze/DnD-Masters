/* eslint-disable */
import { useEffect, useRef } from 'react';
import './attributesSelection.scss';

interface props {
  name: string;
  handleClick: any;
  bonus: number;
  selected: boolean;
}

const AbilityBonusChoice = ({ name, handleClick, selected }: props) => {
  const ref = useRef();

  return (
    <div
      className="abilityBonusChoice"
      onClick={() => {
        handleClick(name);
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default AbilityBonusChoice;
