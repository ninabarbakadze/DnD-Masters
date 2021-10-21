import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import GameWizard from './Components/GameWizard/Gamewizard';
import CharacterWizard from './Components/CharacterWizard/CharacterWizard';
import MapWizard from './Components/MapWizard/MapWizard';
import Dashboard from './Components/Dashboard/Dashboard';
import EncounterWizard from './Components/EncounterWizard/EncounterWizard';
import GameRoom from './Components/Game/GameRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/gameWizard">
          <GameWizard />
        </Route>
        <Route path="/characterWizard">
          <CharacterWizard />
        </Route>
        <Route path="/mapWizard">
          <MapWizard />
        </Route>
        <Route path="/encounterWizard">
          <EncounterWizard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/play">
          <GameRoom />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
