import { Route, Switch, useHistory } from 'react-router-dom';
import './characterWizard.scss';

import RaceSelection from './steps/RaceSelection.step';
import { iCharacter } from '../../interfaces/character.interface';
import SubRaceSelection from './steps/subRaceSelection.step';
import { useWizardStepComplete } from '../../utilities/wizard.utilities';
import BackgroundSelectionStep from './steps/backgroundSelection.step';
import AttributeSelectionStep from './steps/attributeSelection/attributeSelection.step';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import ClassSelection from './steps/ClassSelection.step';
import WizardNav from '../WizardNav/WizardNav';

const CharacterWizard = () => {
  const onWizardComplete = () => {};
  const history = useHistory();

  const submitfunc = useWizardStepComplete<iCharacter>(onWizardComplete);

  return (
    <div className="character-wizard wizard flex-col justify-center items-center text-center">
      <div className="wizard-header">
        <h1>Character Wizard</h1>
        <WizardNav history={history} />
      </div>
      <div className="mt-2">
        <Switch>
          <Route path="/characterWizard/raceSelection">
            <RaceSelection
              onSubmit={submitfunc}
              path="/characterWizard/backgroundSelection"
            />
          </Route>
          <Route path="/characterWizard/subRaceSelection">
            <SubRaceSelection
              onSubmit={submitfunc}
              path="/characterWizard/backgroundSelection"
            />
          </Route>
          <Route path="/characterWizard/backgroundSelection">
            <BackgroundSelectionStep
              onSubmit={submitfunc}
              path="/characterWizard/classSelection"
            />
          </Route>
          <Route path="/characterWizard/classSelection">
            <ClassSelection
              onSubmit={submitfunc}
              path="/characterWizard/attributeSelection"
            />
          </Route>
          <Route path="/characterWizard/attributeSelection">
            <AttributeSelectionStep
              onSubmit={submitfunc}
              path="/characterWizard/characterSheet"
            />
          </Route>
          <Route path="/characterWizard/characterSheet">
            <CharacterSheet fetched={undefined} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default CharacterWizard;
