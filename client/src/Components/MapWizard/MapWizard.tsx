import { Route, Switch } from 'react-router-dom';

import MapSelection from './Steps/MapSelection';
import MapUpload from './Steps/MapUpload';
import MapEdit from './Steps/MapEdit';

export default function MapWizard() {
  return (
    <div>
      <h1>Map Wizard</h1>
      <Switch>
        <Route path="/mapWizard/mapSelection">
          <MapSelection />
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
