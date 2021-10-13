import { Link } from 'react-router-dom';
import './Dashboard.scss';

// this will be refactored once we have real assets :)
export default function Dashboard() {
  return (
    <div>
      <div className="header">
        <p>Hello, Bob</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
      </div>
      <div className="navigation">
        <Link to="/map/wizard">
          <img src="https://i.redd.it/pq61m18mmzp51.jpg" alt="img" />
        </Link>
        <Link to="/character/wizard">
          <img
            src="https://media.dnd.wizards.com/styles/mosaic_thumbnail/public/images/mosaic/NEW_TO_DD_Classes_Fighter_T_140626.jpg"
            alt="img"
          />
        </Link>
        <Link to="/ecounter/wizard">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5dadaf88e03a4e6bb69307dd/1579653459911-ZX5PPMR1RKA92HOGCUMY/Capture.jpg?format=1000w"
            alt="img"
          />
        </Link>
        <Link to="/game/wizard">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Android_TV_game_controller.jpg/1200px-Android_TV_game_controller.jpg"
            alt="img"
          />
        </Link>
        <Link to="/play">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/13/04/25/play-button-2138735_1280.png"
            alt="img"
          />
        </Link>
      </div>
    </div>
  );
}
