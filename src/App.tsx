import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";

import Deleted from "./pages/Deleted";
import About from "./pages/About";

import { useEffect, useState } from "react";
import { getCurrentUser } from "./firebaseCfg";

setupIonicReact();

const App: React.FC = () => {
  const [userLogged, setLogged] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu userLogged={userLogged} setLogged={setLogged}/>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route
              path="/home"
              exact={true}
              render={(props) => {
                return userLogged ? <Home /> : <Login setLogged={setLogged}/>;
              }}
            />
            <Route
              path="/tasks/:id"
              render={(props) => {
                return userLogged ? <TaskList {...props} /> : <Login setLogged={setLogged}/>;
              }}
            />
            <Route
              path="/deleted"
              exact={true}
              render={(props) => {
                return userLogged ? <Deleted /> : <Login setLogged={setLogged}/>;
              }}
            />
            <Route
              path="/about"
              exact={true}
              render={(props) => {
                return userLogged ? <About /> : <Login setLogged={setLogged}/>;
              }}
            />

            <Route path="/signup" exact={true}>
              <SignUp />
            </Route>
            <Route
              path="/login"
              exact={true}
              render={(props) => {
                return userLogged ? <Home /> : <Login setLogged={setLogged}/>;
              }}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
