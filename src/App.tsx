/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import PasswordReset from "./components/sdsb-component/password_reset/PasswordReset";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState } from "react";

interface IPop {
  component: JSX.Element;
  path: string;
}

function App() {
  const [token,] = useState(true);

  const CreateRoute = function (props: IPop) {
    return (
      <Route exact path={props.path}>
        {token && props.component}
        {!token && <Redirect to="/sign-up" />}
      </Route>
    );
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/">
            {token && <Redirect to="/dashboard" />}
            {!token && <Redirect to="/sign-up" />}
          </Route>
          <CreateRoute component={<Home />} path="/dashboard"></CreateRoute>
          <CreateRoute component={<Tables />} path="/tables"></CreateRoute>
          <CreateRoute component={<Billing />} path="/billing"></CreateRoute>
          <CreateRoute component={<Rtl />} path="/rtl"></CreateRoute>
          <CreateRoute component={<Profile />} path="/profile"></CreateRoute>
          <Route exact component={PasswordReset} path="/password-reset" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
