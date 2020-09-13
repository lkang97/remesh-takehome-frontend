import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Route path="/" exact component={Main} />
      </BrowserRouter>
    </div>
  );
}

export default App;
