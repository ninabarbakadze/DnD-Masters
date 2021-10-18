interface IProps{
    death:any
    success:string[]
    fail:string[]
}
export default function CharacterSheetDeathSaves({ death, success, fail }:IProps) {
//   const handleClick = (val: string):any => {
//     console.log(deathSave);
//     deathSave.length < 4
//       ? death((arr:string[]) => [...arr, val]) : null;
//   };
//   console.log(deathSave);
  console.log(success, fail, death);
  return (
    <div>

      <button type="button" onClick={death('fails')}>💀</button>
      <button type="button">❤️</button>
    </div>
  );
}
