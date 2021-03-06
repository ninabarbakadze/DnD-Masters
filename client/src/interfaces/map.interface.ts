export interface iElement {
  id: string;
  elementName: string | undefined;
  x: number;
  y: number;
  title: string;
  description?: string;
}

export interface iMap {
  mapName?: string;
  mapId?: string;
  mapUrl?: string;
  selectedElement?: string;
  elementArr?: iElement[];
  locationArr?: JSX.Element[];
  shouldDelete?: boolean;
  currentDescription?: string;
  currentName?: string;
  username?: string;
}

export interface iLoadedMap {
  mapName: string;
  mapUrl: string;
  locationData: iElement[];
  _id: string;
}
