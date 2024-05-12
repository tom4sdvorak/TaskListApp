import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { loginUser } from "../firebaseCfg";

import { useHistory } from "react-router";
import "../theme/variables.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function tryLogin() {
    console.log("Loggin with: " + email + password);
    const res = await loginUser(email, password);
    if (res) {
      redirectToHome();
    }
  }

  const redirectToHome = () => {
    history.push("/home");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol className="ion-padding">
              <IonTitle className="ion-padding">Welcome to </IonTitle>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <h1>Task App</h1>
            </IonCol>
          </IonRow>

          <form>
            <div className="flex ion-padding ion-margin">
              <IonInput
                className="ion-margin-bottom"
                fill="outline"
                type="email"
                placeholder="email"
                onIonInput={(e: any) => setEmail(e.target.value)}
              ></IonInput>

              <IonInput
                fill="outline"
                type="password"
                placeholder="password"
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>
            </div>

            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <IonButton id="login-button" onClick={tryLogin}>
                  Log in
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>

            <p>
              Don't have an account yet? Sign up <a href="/signup">here</a>
            </p>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
