import { Link } from 'react-router-dom';

export default function DashboarMenuItem({ link, image, text }: any) {
  return (
    <Link to={link}>
      <div className="dashboard-image-container">
        <img className="dashboard-image" src={image} alt="" />
        <div className="middle">
          <div className="text">{text}</div>
        </div>
      </div>
    </Link>
  );
}
