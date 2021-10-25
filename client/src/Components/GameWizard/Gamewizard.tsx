import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '../../interfaces/redux.interface';

import { iGameWizardState } from '../../reducers/gameCreation.reducer';
import Name from './Steps/Name.step';
import SelectMap from './Steps/SelectMap.step';
import Invitation from './Steps/Invitation.step';
import WizardNav from '../WizardNav/WizardNav';

import './GameWizard.scss';

const GameWizard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onWizardComplete = () => {
    alert('game created');
    history.push('/play');
  };

  const onSubmit = (
    data: iGameWizardState,
    payLoadAction: PayloadAction<iGameWizardState>,
    path?: string,
  ) => {
    dispatch(payLoadAction(data));
    if (path) history.push(path);
    else {
      onWizardComplete();
    }
  };

  return (
    <div>
      <div className="wizard-header">
        <h1>Map Wizard</h1>
        <WizardNav history={history} />
      </div>
      <Switch>
        <Route path="/gameWizard/name">
          <Name onSubmit={onSubmit} path="/gameWizard/MapSelection" />
        </Route>
        <Route path="/gameWizard/MapSelection">
          <SelectMap onSubmit={onSubmit} path="/gameWizard/invites" />
        </Route>
        <Route path="/gameWizard/invites">
          <Invitation onSubmit={onSubmit} />
        </Route>
      </Switch>
    </div>
  );
};

export default GameWizard;
