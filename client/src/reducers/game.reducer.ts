export interface iGameWizardState {
  name: string;
  tags: string;
  mapName: string;
  mapTags: string;
}

const initialState = {
  name: '',
  tags: '',
  mapName: '',
  mapTags: '',
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
        mapName: action.payload.mapName,
        mapTags: action.payload.mapTags,
      };
    default:
      return state;
  }
};

export default gameReducer;
