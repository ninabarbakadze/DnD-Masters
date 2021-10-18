/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
interface props {
  name: string;
  imgPath: string;
  content?: JSX.Element;
}

const DetailsCard = ({ name, imgPath }: props) => {
  return (
    <div>
      <div>
        {imgPath && (
          <figure>
            <img src={imgPath} alt={`${name}`} />
          </figure>
        )}
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default DetailsCard;
