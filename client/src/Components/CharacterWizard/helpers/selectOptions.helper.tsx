/* eslint-disable */

import { iResourceListItem } from '../../../interfaces/externalData/externalData.interface';

function Options<T extends iResourceListItem[]>(options: T | any[]) {
  const rOptions = options.map((option: any) => {
    return (
      <option
        aria-label={option.index || option}
        key={option.index || option}
        value={option.name || option}
      >
        {option.name || option}
      </option>
    );
  });
  return rOptions;
}

export default Options;
