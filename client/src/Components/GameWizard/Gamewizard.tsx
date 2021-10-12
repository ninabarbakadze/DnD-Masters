import { Route, Switch } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { PayloadAction } from '../../interfaces/reduxInterfaces';

// import { iGameWizardState } from '../../reducers/game';
import Name from './Steps/Name.step';
import SelectMap from './Steps/SelectMap.step';
import Invitation from './Steps/Invitation.step';
// import { IRootState } from '../../reducers';

export default function GameWizard() {
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const onWizardComplete = () => console.log('finished');

  // const onSubmit = (
  //   data: iGameWizardState,
  //   payLoadAction: PayloadAction<iGameWizardState>,
  //   path?: string,
  // ) => {
  //   dispatch(payLoadAction(data));
  //   if (path) history.push(path);
  //   else {
  //     onWizardComplete();
  //   }
  // };

  return (
    <div>
      <h1>GameWizard</h1>
      <Switch>
        <Route path="/gameWizard/step1">
          <Name />
        </Route>
        <Route path="/gameWizard/step2">
          <SelectMap />
        </Route>
        <Route path="/gameWizard/step3">
          <Invitation />
        </Route>
      </Switch>
    </div>
  );
}
