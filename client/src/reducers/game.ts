export interface iGameWizardState {
  position: number;
  wizardData: {
    name: string;
    tags: string;
    mapName: string;
    mapTags: string;
  };
}

const initialState = {
  position: 0,
  wizardData: {
    name: '',
    tags: '',
    mapName: '',
    mapTags: '',
  },
};

interface IAction {
  type: string;
  payload: {
    name: string;
    tags: string;
    mapName: string;
    mapTags: string;
  };
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
        mapName: action.payload.mapName,
        mapTags: action.payload.mapTags,
      };
    case 'STEP_FORWARD':
      return { ...state, position: state.position + 1 };
    case 'STEP_BACKWARD':
      return { ...state, position: state.position - 1 };
    default:
      return state;
  }
};

export default gameReducer;
