import { iMap } from '../interfaces/map.interface';
import { iAction } from '../interfaces/reduxInterfaces';

const initialState: iMap = {};

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
    case 'UPDATE_URL':
      return {
        ...state,
        mapUrl: payload.mapUrl,
      };
    default:
      return state;
  }
};

export default mapCreationReducer;
