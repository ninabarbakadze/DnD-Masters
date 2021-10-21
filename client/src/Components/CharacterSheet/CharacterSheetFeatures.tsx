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
    <div className="features-and-traits">
      <div className="bright-frame  smallTitle">{features.name}</div>
      {hide ? features.desc.map((item:any) => (
        <div key={item}>
          <div className="featureItem">{item}</div>
        </div>
      )) : null}
      <button type="button" onClick={() => { setHide(!hide); }}>...</button>
    </div>
  );
}
