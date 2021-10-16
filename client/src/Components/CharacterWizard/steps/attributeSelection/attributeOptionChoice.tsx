/* eslint-disable */
interface props {
  name: string;
  index: string;
  handleClick: () => void;
  bonus: number;
  selected: boolean;
}

const AbilityBonusChoice = ({ name, index, handleClick, selected }: props) => {
  return (
    <div onClick={() => {}}>
      <p>{name}</p>
    </div>
  );
};

export default AbilityBonusChoice;
