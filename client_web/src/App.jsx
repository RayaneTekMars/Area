import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/Landing";
import SigninPage from "./views/Signin";
import HomePage from "./views/Home";
import ProfilePage from "./views/Profile";
import OauthGoogle from "./views/Oauth/google";
import OauthTwitter from "./views/Oauth/twitter";
import OauthGithub from "./views/Oauth/github";
import OauthDiscord from "./views/Oauth/discord";
import ServiceSpotify from "./views/Services/Spotify";
import Twitch from "./views/Services/Twitch";
import Discord from "./views/Services/Discord";
import Scenario from "./views/Scenario";
import ScenarioCreate from "./views/Scenario/Create";
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
      <Route path={ROUTES.OAUTH_GITHUB} element={< OauthGithub />} />
      <Route path={ROUTES.OAUTH_DISCORD} element={< OauthDiscord />} />
      <Route path={ROUTES.SERVICE_SPOTIFY} element={< ServiceSpotify />} />
      <Route path={ROUTES.SCENARIO} element={< Scenario />} />
      <Route path={ROUTES.SERVICE_DISCORD} element={< Discord />} />
      <Route path={ROUTES.SERVICE_TWITCH} element={< Twitch />} />
      <Route path={ROUTES.SCENARIO_CREATE} element={< ScenarioCreate />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;