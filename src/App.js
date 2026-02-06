import './App.css';
import {ROUTES} from "./Routes/routes.index";
import {useRoutes} from "react-router-dom";
import Preloader from "./Componet/Preloader/Preloader";
import WOW from 'wow.js';
new WOW().init();

function App() {
  return (
      <>
          <Preloader />
          {useRoutes(ROUTES)}
      </>
  );
}

export default App;
