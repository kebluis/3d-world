const PlayerControlReducer = (state, action) => {
  switch (action.type) {
    case "change_key_pressed":
      return {
        ...state,
        keyPressed: action.payload,
      };
    default:
      return state ;
  }
};

export default PlayerControlReducer;
