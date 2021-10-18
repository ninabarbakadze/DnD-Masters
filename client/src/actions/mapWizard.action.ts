import { iMap } from '../interfaces/map.interface';
import { PayloadAction } from '../interfaces/reduxInterfaces';

export const updateSelectedElement: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_SELECTED_ITEM',
  payload: mapData,
});

export const updateElementArr: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_ELEMENT_ARR',
  payload: mapData,
});

export const updateUrl: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_URL',
  payload: mapData,
});
