// interface props {
//   name: string;
//   imgPath: string;
// }
/* eslint-disable */
// @ts-ignore
export default function CharacterCard({ name, imgPath }) {
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
