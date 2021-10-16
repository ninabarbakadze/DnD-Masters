/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
interface props {
  name: string;
  increment: any;
  value: number;
  bonus: number;
}

const AttributePointBuy = ({ name, increment, value, bonus }: props) => {
  return (
    <div>
      {name}
      <button type="button" onClick={() => increment('-', name)}>
        -
      </button>
      <p>{value}</p>
      <button type="button" onClick={() => increment('+', name)}>
        +
      </button>
      <p>Bonus</p>
      {bonus}
    </div>
  );
};

export default AttributePointBuy;
