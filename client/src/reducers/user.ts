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
    case 'LOGIN': {
      const updatedState = {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        name: action.payload,
      };
      console.log(updatedState);
      return updatedState;
    }

    case 'LOGOUT':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    default:
      return state;
  }
};

export default userReducer;
