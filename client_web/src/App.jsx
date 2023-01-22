import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/Landing";
import * as ROUTES from './constants/routes';

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
      <Route path={ROUTES.LANDING} element={< LandingPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;