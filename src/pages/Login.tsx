import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { loginUser } from '../firebaseCfg'
import "./Home.css";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function tryLogin() {
    console.log("Loggin with: " + email + password);
    const res = await loginUser(email, password);
    if(res){
      redirectToHome();
    }
  }

  const redirectToHome = () => {
    history.push('/home');
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
              <IonButton onClick={tryLogin}>Log in</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <p>
            Don't have an account yet? Sign up <a href="/signup">here</a>
          </p>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
