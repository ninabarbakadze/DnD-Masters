/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';

interface props {
  name: string;
  increment: any;
  value: number;
  bonus: number;
}

const AttributePointBuy = ({ name, increment, value, bonus }: props) => {
  return (
    <div className=" mt-10 mb-10 space-x-4 w-2/4}">
      <h4 className="inline-block w-4">{name}</h4>
      <button
        className="inline-block w-5"
        type="button"
        onClick={() => increment('-', name)}
      >
        <MinusCircleIcon className="h-5 w-5 text-gray-600 hover:text-gray-300" />
      </button>
      <p className="inline-block">{value}</p>
      <button
        className="inline-block "
        type="button"
        onClick={() => increment('+', name)}
      >
        <PlusCircleIcon className="h-5 w-5 text-gray-600 hover:text-gray-300" />
      </button>
      <p className="inline-block">Bonus:</p>
      <p className="inline-block">{bonus}</p>
    </div>
  );
};

export default AttributePointBuy;
