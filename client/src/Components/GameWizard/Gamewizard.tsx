import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '../../interfaces/reduxInterfaces';

import { iGameWizardState } from '../../reducers/game';
import Name from './Steps/Name.step';
import SelectMap from './Steps/SelectMap.step';
import Invitation from './Steps/Invitation.step';
// import { IRootState } from '../../reducers';

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

  // const Props = {
  //   test: history,
  //   onSubmit,
  //   path: "/gameWizard/selectMap",
  // };
  // const gameWizardStore = useSelector((state: IRootState) => state.game);
  return (
    <div>
      <h1>GameWizard</h1>
      <Switch>
        <Route
          path="/gameWizard/nameStep"
          component={() => (
            <Name
              debug="green"
              path="/gameWizard/selectMap"
              onSubmit={onSubmit}
            />
          )}
        />
        <Route path="/gameWizard/selectMap" component={SelectMap} />
        <Route path="/gameWizard/invitations" component={Invitation} />
      </Switch>
    </div>
  );
}
