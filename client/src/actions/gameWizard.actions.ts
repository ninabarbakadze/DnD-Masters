export const updateName = (wizardData: any) => ({
  type: 'UPDATE_NAME',
  payload: wizardData,
});

export const updateMap = (wizardData: any) => ({
  type: 'UPDATE_MAP',
  payload: wizardData,
});

export const stepForward = () => ({
  type: 'STEP_FORWARD',
});

export const stepBackward = () => ({
  type: 'STEP_BACKWARD',
});
