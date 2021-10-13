import { FC } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '../../interfaces/reduxInterfaces';

import { iGameWizardState } from '../../reducers/game';
import RaceSelection from './steps/RaceSelection.step';

const CharacterWizard: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onWizardComplete = () => console.log('finished');

  const onSubmit = (
    data: iGameWizardState,
    payLoadAction: PayloadAction<iGameWizardState>,
    path?: string,
  ): void => {
    dispatch(payLoadAction(data));
    if (path) history.push(path);
    else {
      onWizardComplete();
    }
  };

  return (
    <div>
      <h1>Character Wizard</h1>
      <Switch>
        <Route path="/characterWizard/raceSelection">
          <RaceSelection onSubmit={onSubmit} path="/gameWizard/step2" />
        </Route>
      </Switch>
    </div>
  );
};

export default CharacterWizard;
