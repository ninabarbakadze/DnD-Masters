import { useState } from 'react';

interface IFeature{
    name:string
    desc:string[]
}
interface IProp{
    features:IFeature
}
export default function CharacterSheetFeatures({ features }:IProp) {
  const [hide, setHide] = useState(false);
  return (
    <div>
      <b>{features.name}</b>
      {hide ? features.desc.map((item:any) => (
        <div key={item}>
          <p>{item}</p>
        </div>
      )) : null}
      <button type="button" onClick={() => { setHide(!hide); }}>...</button>
    </div>
  );
}
