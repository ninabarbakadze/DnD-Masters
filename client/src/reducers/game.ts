const initialState = {
  position: 0,
};

interface IAction {
  type: string;
}

const gameReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'MOVE':
      return { ...state, position: state.position };
    default:
      return state;
  }
};

export default gameReducer;
