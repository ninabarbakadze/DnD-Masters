import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '../../interfaces/redux.interface';

import { iGameWizardState } from '../../reducers/game.reducer';
import Name from './Steps/Name.step';
import SelectMap from './Steps/SelectMap.step';
import Invitation from './Steps/Invitation.step';

export default function GameWizard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onWizardComplete = () => console.log('finished');

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
      <h1>GameWizard</h1>
      <Switch>
        <Route path="/gameWizard/step1">
          <Name onSubmit={onSubmit} path="/gameWizard/step2" />
        </Route>
        <Route path="/gameWizard/step2">
          <SelectMap onSubmit={onSubmit} path="/gameWizard/step3" />
        </Route>
        <Route path="/gameWizard/step3">
          <Invitation onSubmit={onWizardComplete} />
        </Route>
      </Switch>
    </div>
  );
}
