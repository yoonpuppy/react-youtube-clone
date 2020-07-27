import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
// #3
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage"
// #9 
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage"
// #13
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/Video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/Video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
