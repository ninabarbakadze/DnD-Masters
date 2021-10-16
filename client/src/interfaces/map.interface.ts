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
  mapUrl?: string;
  selectedElement?: string;
  elementArr?: iElement[];
}
