import { useSelector } from 'react-redux';

import Name from './Steps/Name.step';
import SelectMap from './Steps/SelectMap.step';
import { IRootState } from '../../reducers';

export default function GameWizard() {
  const gameWizardStore = useSelector((state: IRootState) => state.game);
  const steps = [<Name />, <SelectMap />];
  return (
    <div>
      {console.log(gameWizardStore)}
      <h1>GameWizard</h1>
      {steps[gameWizardStore.position]}
    </div>
  );
}
