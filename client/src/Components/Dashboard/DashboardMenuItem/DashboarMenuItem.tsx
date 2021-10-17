import { Link } from 'react-router-dom';

export default function DashboarMenuItem({ link, image }: any) {
  return (
    <Link to={link}>
      <div>
        <img className="dashboard-images" src={image} alt="" />
      </div>
    </Link>
  );
}
