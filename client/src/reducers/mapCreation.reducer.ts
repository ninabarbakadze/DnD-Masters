import { iMap } from '../interfaces/map.interface';
import { iAction } from '../interfaces/redux.interface';

const initialState: iMap = {
  shouldDelete: false,
  locationArr: [],
  elementArr: [],
  mapName: 'just a test',
};

const mapCreationReducer = (
  state: iMap = initialState,
  { type, payload }: iAction<iMap>,
) => {
  switch (type) {
    case 'UPDATE_SELECTED_ITEM':
      return {
        ...state,
        selectedElement: payload.selectedElement,
      };
    case 'UPDATE_ELEMENT_ARR':
      return {
        ...state,
        elementArr: payload.elementArr,
      };
    case 'UPDATE_LOCATION_ARR':
      return {
        ...state,
        locationArr: payload.locationArr,
      };
    case 'UPDATE_URL':
      return {
        ...state,
        mapUrl: payload.mapUrl,
      };
    case 'SET_DELETE':
      return {
        ...state,
        shouldDelete: !state.shouldDelete,
      };
    case 'SET_CURRENT_DESCRIPTION':
      return {
        ...state,
        currentDescription: payload.currentDescription,
        currentName: payload.currentName,
      };
    default:
      return state;
  }
};

export default mapCreationReducer;
