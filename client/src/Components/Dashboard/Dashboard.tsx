import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import DashboarMenuItem from './DashboardMenuItem/DashboarMenuItem';
import './Dashboard.scss';

const Dashboard = () => {
  const user = useSelector((state: IRootState) => state.userReducer);
  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>
          Hello,
          {+' ' + user.name}
        </h1>
        <svg
          className="user-avatar"
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
        <DashboarMenuItem
          image="https://i.redd.it/pq61m18mmzp51.jpg"
          link="/mapWizard/mapSelection"
          text="Create Map"
        />
        <DashboarMenuItem
          image="https://media.dnd.wizards.com/styles/mosaic_thumbnail/public/images/mosaic/NEW_TO_DD_Classes_Fighter_T_140626.jpg"
          link="/characterWizard/raceSelection"
          text="Create Character"
        />
        <DashboarMenuItem
          image="https://images.squarespace-cdn.com/content/v1/5dadaf88e03a4e6bb69307dd/1579653459911-ZX5PPMR1RKA92HOGCUMY/Capture.jpg?format=1000w"
          link="/encounterWizard"
          text="Create Encounter"
        />
        <DashboarMenuItem
          image="https://images.unsplash.com/photo-1601987177651-8edfe6c20009?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          link="/gameWizard/name"
          text="Create Game"
        />
        <DashboarMenuItem
          image="https://images.unsplash.com/photo-1585504198199-20277593b94f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1317&q=80"
          link="/joinGame"
          text="Play Game"
        />
      </div>
    </div>
  );
};

export default Dashboard;
