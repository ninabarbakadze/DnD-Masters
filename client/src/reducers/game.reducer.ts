export interface iGameWizardState {
  name: string;
  tags: string;
  mapId: string;
}

const initialState = {
  name: '',
  tags: '',
  mapId: '',
};

interface IAction {
  type: string;
  payload: iGameWizardState;
}

const gameReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload.name,
        tags: action.payload.tags,
      };
    case 'UPDATE_MAP':
      return {
        ...state,
        mapId: action.payload.mapId,
      };
    default:
      return state;
  }
};

export default gameReducer;
