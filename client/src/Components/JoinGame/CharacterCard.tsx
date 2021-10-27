interface props {
  name: string;
  imgPath: string;
}
/* eslint-disable */
export default function CharacterCard({ name, imgPath }:props) {
  return (
    <div>
      {imgPath && (
      <figure>
        <img src={imgPath} alt={`${name}`} />
      </figure>
      )}
      <h1>{name}</h1>
    </div>
  );
}
