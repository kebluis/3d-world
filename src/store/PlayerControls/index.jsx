import { createContext, useCallback, useReducer } from "react";
import PlayerControlReducer from "./reducer";

export const PlayerControlContext = createContext();

const PlayerControlState = ({ children }) => {
  const initialState = {
    keyPressed: 2,
  };

  const [state, dispatch] = useReducer(PlayerControlReducer, initialState);

  const onKeyChange = useCallback((value) => {
    dispatch({
      type: "change_key_pressed",
      payload: value,
    });
  }, []);

  return (
    <PlayerControlContext.Provider
      value={{
        keyPressed: state.keyPressed,
        onKeyChange,
      }}
    >
      {children}
    </PlayerControlContext.Provider>
  );
};

export default PlayerControlState;
