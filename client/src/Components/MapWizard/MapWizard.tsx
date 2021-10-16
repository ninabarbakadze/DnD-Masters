import { Route, Switch, useHistory } from 'react-router-dom';

import MapSelection from './Steps/MapSelection';
import MapUpload from './Steps/MapUpload';
import MapEdit from './Steps/MapEdit';
import './MapWizard.scss';

export default function MapWizard() {
  const history = useHistory();
  return (
    <div className="map-wizard-container">
      <h1>Map Wizard</h1>
      <Switch>
        <Route path="/mapWizard/mapSelection">
          <MapSelection history={history} />
        </Route>
        <Route path="/mapWizard/mapUpload">
          <MapUpload />
        </Route>
        <Route path="/mapWizard/mapEdit">
          <MapEdit />
        </Route>
      </Switch>
    </div>
  );
}
