import React from "react";
import Home from "./components/home";
import { Provider } from "./context";

function App() {
  return (
    <Provider>
      <div className="flex w-full h-full">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
