import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
// import { getUser } from '../../services/user.services';
import DashboarMenuItem from './DashboardMenuItem/DashboarMenuItem';
import './Dashboard.scss';

// this will be refactored once we have real assets :)
export default function Dashboard() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div className="dashboard-container">
      <div className="header">
        <p>
          Hello,
          {user.name}
        </p>
        <svg
          className="user-avatar"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          {/* eslint-disable-next-line */}
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
      </div>
      <div className="navigation">
        <DashboarMenuItem
          image="https://i.redd.it/pq61m18mmzp51.jpg"
          link="/mapWizard/mapSelection"
        />
        <DashboarMenuItem
          // eslint-disable-next-line
          image="https://media.dnd.wizards.com/styles/mosaic_thumbnail/public/images/mosaic/NEW_TO_DD_Classes_Fighter_T_140626.jpg"
          link="/characterWizard/raceSelection"
        />
        <DashboarMenuItem
          // eslint-disable-next-line
          image="https://images.squarespace-cdn.com/content/v1/5dadaf88e03a4e6bb69307dd/1579653459911-ZX5PPMR1RKA92HOGCUMY/Capture.jpg?format=1000w"
          link="/encounterWizard"
        />
        <DashboarMenuItem
          // eslint-disable-next-line
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Android_TV_game_controller.jpg/1200px-Android_TV_game_controller.jpg"
          link="/gameWizard/step1"
        />
        <DashboarMenuItem
          // eslint-disable-next-line
          image="https://cdn.pixabay.com/photo/2017/03/13/04/25/play-button-2138735_1280.png"
          link="/play"
        />
      </div>
    </div>
  );
}
