import { Route, Switch, useHistory } from 'react-router-dom';
import MapSelection from './Steps/MapSelection';
import MapUpload from './Steps/MapUpload';
import MapEdit from './Steps/MapEdit';
import WizardNav from '../WizardNav/WizardNav';
import './MapWizard.scss';

const MapWizard = () => {
  const history = useHistory();
  return (
    <div className="map-wizard-container">
      <div className="wizard-header">
        <h1>Map Wizard</h1>
        <WizardNav history={history} />
      </div>
      <Switch>
        <Route path="/mapWizard/mapSelection">
          <MapSelection history={history} />
        </Route>
        <Route path="/mapWizard/mapUpload">
          <MapUpload history={history} />
        </Route>
        <Route path="/mapWizard/mapEdit">
          <MapEdit />
        </Route>
      </Switch>
    </div>
  );
};

export default MapWizard;
