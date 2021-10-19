/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
interface props {
  name: string;
  imgPath: string;
  content?: JSX.Element;
}

const DetailsCard = ({ name, imgPath, content }: props) => {
  return (
    <div className="flex-row flex rounded-2xl bg-gray-300 drop-shadow-2xl">
      <div className="bg-gray-400">
        {imgPath && (
          <figure className=" wizard-image h-3/4">
            <img src={imgPath} alt={`${name}`} />
          </figure>
        )}
        <h1 className="text-5xl text-yellow-100 font-bold">{name}</h1>
      </div>
      {content && content}
    </div>
  );
};

export default DetailsCard;
