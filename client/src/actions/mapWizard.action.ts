import { iMap } from '../interfaces/map.interface';
import { PayloadAction } from '../interfaces/redux.interface';

export const updateSelectedElement: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_SELECTED_ITEM',
  payload: mapData,
});

export const updateElementArr: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_ELEMENT_ARR',
  payload: mapData,
});

export const updateLocationArr: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_LOCATION_ARR',
  payload: mapData,
});

export const updateUrl: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_URL',
  payload: mapData,
});

export const setDelete: PayloadAction<iMap> = (mapData) => ({
  type: 'SET_DELETE',
  payload: mapData,
});

export const setCurrentDescription: PayloadAction<iMap> = (mapData) => ({
  type: 'SET_CURRENT_DESCRIPTION',
  payload: mapData,
});

export const updateMapNameAndId: PayloadAction<iMap> = (mapData) => ({
  type: 'UPDATE_MAP_NAME_AND_ID',
  payload: mapData,
});
