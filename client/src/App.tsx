import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import GameWizard from './Components/GameWizard/Gamewizard';

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
      </Switch>
    </Router>
  );
}
export default App;
