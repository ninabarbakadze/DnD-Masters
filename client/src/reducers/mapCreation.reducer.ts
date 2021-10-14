const initialState = {
  imgURL: '',
  location: SVGSVGElement,
};

const mapCreationReducer = (state = initialState, action: any) => {
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

export default mapCreationReducer;
