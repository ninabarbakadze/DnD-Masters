const initialState = {
  isLoggedIn: false,
  name: '',
};

export interface IAction {
  type: string;
  payload: string;
}

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        name: action.payload,
      };
    case 'LOGOUT':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    case 'UPDATE': // test editable component
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
