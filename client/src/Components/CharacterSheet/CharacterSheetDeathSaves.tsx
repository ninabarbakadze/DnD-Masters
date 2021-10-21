interface IProps{
    death:any
    success:number
    fail:number
}
export default function CharacterSheetDeathSaves({ death, success, fail }:IProps) {
  return (
    <div className="deathSave">
      <div className="character-sheet-fails">
        <p>{fail}</p>
        <button type="button" onClick={() => (death('fails'))}>💀</button>
      </div>
      <div className="character-sheet-success">
        <p>{success}</p>
        <button type="button" onClick={() => (death('success'))}>❤️</button>
      </div>
    </div>
  );
}
