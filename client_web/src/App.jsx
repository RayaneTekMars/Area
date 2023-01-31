import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/Landing";
import SigninPage from "./views/Signin";
import HomePage from "./views/Home";
import ProfilePage from "./views/Profile";
import OauthGoogle from "./views/Oauth/google";
import OauthTwitter from "./views/Oauth/twitter";
import * as ROUTES from './constants/routes';

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
      <Route path={ROUTES.LANDING} element={< LandingPage />} />
      <Route path={ROUTES.SIGN_IN} element={< SigninPage />} />
      <Route path={ROUTES.HOME} element={< HomePage />} />
      <Route path={ROUTES.PROFILE} element={< ProfilePage />} />
      <Route path={ROUTES.OAUTH_GOOGLE} element={< OauthGoogle />} />
      <Route path={ROUTES.OAUTH_TWITTER} element={< OauthTwitter />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;