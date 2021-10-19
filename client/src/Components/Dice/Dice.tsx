import { useState } from 'react';
import './Dice.scss';

export default function Dice() {
  const [option, setOption] = useState<number>();
  const [randomInt, setRandomInt] = useState<number>();

  const handleChange = (event: any) => {
    setOption(event.target.value);
  };

  function getRandomInt() {
    if (!option) return;
    const random = Math.floor(Math.random() * option) + 1;
    setRandomInt(random);
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Choose dice</option>
        <option value="2">2d</option>
        <option value="3">3d</option>
        <option value="4">4d</option>
        <option value="6">6d</option>
        <option value="8">8d</option>
        <option value="10">10d</option>
        <option value="12">12d</option>
        <option value="20">20d</option>
        <option value="100">100d</option>
      </select>
      <button type="button" onClick={() => getRandomInt()}>Roll</button>
      {randomInt && <p>{randomInt}</p> }
    </div>
  );
}
