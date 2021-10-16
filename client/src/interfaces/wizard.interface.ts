/*eslint-disable*/
import { PayloadAction } from './redux.interface';

export type wizardStepOnSubmit<T> = (
  data: T,
  action: PayloadAction<T>,
  path?: string,
) => void;

export interface iWizardStepProps<T> {
  path?: string;
  onSubmit: wizardStepOnSubmit<T>;
}
