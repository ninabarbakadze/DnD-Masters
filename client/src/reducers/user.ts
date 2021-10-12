const initialState = {
  isLoggedIn: false,
  name: '',
};

interface IAction {
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
    default:
      return state;
  }
};

export default userReducer;
