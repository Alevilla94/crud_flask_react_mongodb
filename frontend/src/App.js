import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { About } from "./components/About";
import { Usuarios } from "./components/Users";
import { Agregar } from "./components/Agregar";
import { Editar } from "./components/Editar";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/" element={<Usuarios/>}></Route>
          <Route path="/agregar" element={<Agregar/>}></Route>
          <Route path="/editar" element={<Editar/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
