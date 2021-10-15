/* eslint-disable */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterBackground } from '../../../interfaces/externalData.interfaces';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Options from '../helpers/selectOptions.helper';
import { dataCleanUp } from '../helpers/chracterCreation.helpers';
import { updateBackground } from '../../../actions/characterCreationWizard.actions';
import { Subscription } from 'react-hook-form/dist/utils/Subject';

type Inputs = {
 background: string;
 personalityTrait:string;
 ideal: string;
 bond: string;
 flaw: string;
}
const loading = [<option key={0}>...Loading</option>]

const BackgroundSelectionStep = ({ path, onSubmit }:iWizardStepProps<iCharacter>) => {
  const [backgrounds, setBackgrounds] = useState<iCharacterBackground[]>([]);
  const [backgroundsList,setBackgroundsList] = useState<JSX.Element[]>(loading);
  const [personalityTraits, setPersonalityTraits] = useState<JSX.Element[]>();
  const [ideals, setideals] = useState<JSX.Element[]>();
  // const [bonds, setBonds] = useState<JSX.Element[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { register, handleSubmit} = useForm<Inputs>();
  // const watchBackground = watch("background",backgrounds[0].name)
  // console.log(watchBackground)

  const getAllBackgroundOptions = () => {
    getAllInList<iCharacterBackground>('backgrounds').then((results) => {
      console.log('kljkjgk',results)
      setBackgrounds(results);
      setBackgroundsList(Options(results));
      // createSubOptions();
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllBackgroundOptions();
  }, []);
  
  const createSubOptions = () => {
    console.log(backgrounds)
    if(backgrounds.length>0){
      // const val = getValues()
      setPersonalityTraits(Options(backgrounds[0].personality_traits.from))
      setideals(Options(backgrounds[0].ideals.from.map(item=>item.desc)))
      // setBonds(Options(backgrounds[0].bonds.from))
    }
  }
  
  useEffect(()=>{
   createSubOptions();
  },[backgrounds])

  return (
    <div>
      <h2>Select Character Background </h2>
      <form
        onSubmit={handleSubmit((data) => {
          const background = dataCleanUp(data.background, backgrounds);
          onSubmit({ background }, updateBackground, path);
        })}
      >
        <label htmlFor='background'>Background</label>
        <select
          {...register('background',{required:true})}
          id="person"
          name="background"
          disabled={isLoading}
        >
          {backgroundsList}
        </select>
        {backgrounds && (
          <>
            <label htmlFor='personalityTrait'>Personality Trait</label>
            <select
              {...register('personalityTrait',{required:true})}
              id="personalityTrait"
              name="personalityTrait"
              disabled={isLoading}
            >
              {personalityTraits}
            </select>
            <label htmlFor='ideals'>Ideal</label>
            <select
              {...register('ideal',{required:true})}
              id="ideal"
              disabled={isLoading}
              >
                {ideals}
            </select>
          {/* <label htmlFor='bonds'>Bond</label>
          <select
            {...register('bond',{required:true})}
            id="bonds"
            disabled={isLoading}
            >
              {bonds}
          </select> */}
        </>
      )};
      </form>
    </div>
  );
};

export default BackgroundSelectionStep;