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
import OauthSpotify from "./views/Oauth/spotify";
import OauthTwitch from "./views/Oauth/twitch";
import ServiceSpotify from "./views/Services/Spotify";
import Twitch from "./views/Services/Twitch";
import Discord from "./views/Services/Discord";
import Github from "./views/Services/Github";
import Twitter from "./views/Services/Twitter";
import Scenario from "./views/Scenario";
import ScenarioCreate from "./views/Scenario/Create";
import * as ROUTES from "./constants/routes";

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.OAUTH_GOOGLE} element={<OauthGoogle />} />
        <Route path={ROUTES.OAUTH_TWITTER} element={<OauthTwitter />} />
        <Route path={ROUTES.OAUTH_GITHUB} element={<OauthGithub />} />
        <Route path={ROUTES.OAUTH_DISCORD} element={<OauthDiscord />} />
        <Route path={ROUTES.OAUTH_SPOTIFY} element={<OauthSpotify />} />
        <Route path={ROUTES.OAUTH_TWITCH} element={<OauthTwitch />} />
        <Route path={ROUTES.SERVICE_SPOTIFY} element={<ServiceSpotify />} />
        <Route path={ROUTES.SCENARIO} element={<Scenario />} />
        <Route path={ROUTES.SERVICE_DISCORD} element={<Discord />} />
        <Route path={ROUTES.SERVICE_TWITCH} element={<Twitch />} />
        <Route path={ROUTES.SERVICE_TWITTER} element={<Twitter />} />
        <Route path={ROUTES.SERVICE_GITHUB} element={<Github />} />
        <Route path={ROUTES.SCENARIO_CREATE} element={<ScenarioCreate />} />
        <Route
          path={ROUTES.DOWNLOAD_APK}
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage:
                  "linear-gradient(to bottom, #333 0%, #222 100%)",
                boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <a
                href="./automateme.apk"
                download
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  backgroundColor: "#0047ab",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                Télécharger l'application AutoMateMe pour Android
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
