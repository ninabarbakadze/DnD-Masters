import { useState } from 'react';

interface IFeature{
    name:string
    description: string
}
interface IProp{
    features:IFeature[]
}
export default function CharacterSheetFeatures({ features }:IProp) {
  const [hide, setHide] = useState(false);
  return (
    <div>
      {features.map((item:IFeature) => (
        <div key={item.name}>
          <p><b>{item.name}</b></p>
          {hide ? <p>{item.description}</p> : null}
        </div>
      ))}
      <button type="button" onClick={() => { setHide(!hide); }}>...</button>
    </div>
  );
}
