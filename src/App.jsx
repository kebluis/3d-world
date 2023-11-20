import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";

import PlayerControlState from "./store/PlayerControls";

function App() {
  return (
    <main>
      <Router>
        {/* <Navbar></Navbar> */}
        <Routes>
          <Route
            path="/"
            element={
              <PlayerControlState>
                <Home />
              </PlayerControlState>
            }
          />
        </Routes>
        {/* <Home /> */}
      </Router>
    </main>
  );
}

export default App;
