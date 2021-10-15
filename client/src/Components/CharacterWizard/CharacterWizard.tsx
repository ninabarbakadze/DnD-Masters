import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import RaceSelection from './steps/RaceSelection.step';
import { iCharacter } from '../../interfaces/character.interface';
import SubRaceSelection from './steps/subRaceSelection.step';
import { useWizardStepComplete } from '../../utilities/wizard.utilities';
import BackgroundSelectionStep from './steps/backgroundSelection.step';

const CharacterWizard: FC = () => {
  const onWizardComplete = () => console.log('finished');

  const handleWizardStepSubmit = useWizardStepComplete<iCharacter>(onWizardComplete);

  return (
    <div>
      <h1>Character Wizard</h1>
      <Switch>
        <Route path="/characterWizard/raceSelection">
          <RaceSelection
            onSubmit={handleWizardStepSubmit}
            path="/characterWizard/backgroundSelection"
          />
          {/* <RaceSelection onSubmit={handle} path="/gameWizard/step2" /> */}
        </Route>
        <Route path="/characterWizard/subRaceSelection">
          <SubRaceSelection
            onSubmit={handleWizardStepSubmit}
            path="/characterWizard/backgroundSelection"
          />
        </Route>
        <Route path="/characterWizard/BackgroundSelection">
          <BackgroundSelectionStep onSubmit={handleWizardStepSubmit} path="/gameWizard/step2" />
        </Route>
      </Switch>
    </div>
  );
};

export default CharacterWizard;
