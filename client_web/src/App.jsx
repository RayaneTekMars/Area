import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/Landing";
import SigninPage from "./views/Signin";
import HomePage from "./views/Home";
import ProfilePage from "./views/Profile";
import * as ROUTES from './constants/routes';

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
      <Route path={ROUTES.LANDING} element={< LandingPage />} />
      <Route path={ROUTES.SIGN_IN} element={< SigninPage />} />
      <Route path={ROUTES.HOME} element={< HomePage />} />
      <Route path={ROUTES.PROFILE} element={< ProfilePage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;