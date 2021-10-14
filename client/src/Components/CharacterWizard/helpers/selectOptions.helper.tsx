/* eslint-disable */

const Options = (options: any[]) => {
  const rOptions = options.map((option: any) => {
    return (
      <option aria-label={option.index} key={option.index} value={option.name}>
        {option.name}
      </option>
    );
  });
  return rOptions;
};

export default Options;
