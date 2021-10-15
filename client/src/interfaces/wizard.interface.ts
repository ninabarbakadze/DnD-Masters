/*eslint-disable*/
import { PayloadAction } from './reduxInterfaces';

// export type wizardStepOnSumbit<T> = (
//   data: T,
//   action: PayloadAction<T>,
//   path?: string,
// ) => {};

// export interface iWizardStepSubmitArgs<T> {
//   data: T;
//   action: PayloadAction<T>;
//   path?: string;
// }

export type wizardStepOnSubmit<T> = (
  data: T,
  action: PayloadAction<T>,
  path?: string,
) => void;
// export type wizardStepOnSubmit = (data:T , action:PayloadAction<T>, path?:string, onWizardComplete: () => void)

export interface iWizardStepProps<T> {
  path?: string;
  // onSubmit<T>({...args}: iWizardStepSubmitArgs<T>): void;
  onSubmit: wizardStepOnSubmit<T>
}
