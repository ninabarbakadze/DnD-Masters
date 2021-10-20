export interface iGameWizardState {
  name: string;
  tags: string;
  mapId: string;
  mapUrl: string;
}

const initialState = {
  name: '',
  tags: '',
  mapId: '',
  mapUrl: '',
};

interface IAction {
  type: string;
  payload: iGameWizardState;
}

const gameCreationReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_NAME_AND_TAG':
      return {
        ...state,
        name: action.payload.name,
        tags: action.payload.tags,
      };
    case 'UPDATE_MAP':
      return {
        ...state,
        mapId: action.payload.mapId,
        mapUrl: action.payload.mapUrl,
      };
    default:
      return state;
  }
};

export default gameCreationReducer;
