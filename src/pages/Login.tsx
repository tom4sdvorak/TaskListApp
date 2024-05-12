import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { loginUser } from "../firebaseCfg";
import { useHistory } from "react-router";
import "../theme/variables.css";

// Interface that holds imported state function from App.tsx
interface LoginProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToast] = useState("Passwords do not match!");

  async function tryLogin() {
    setSpinner(true);
    const res = await loginUser(email, password);
    
    if (res.answer) {
      setSpinner(false);
      setToast(res.message);
      setIsOpen(true);
      setLogged(true);
      setTimeout(redirectToHome, 5000);
    }
    else if (res.message == "auth/invalid-email"){
      setSpinner(false);
      setToast("Invalid email or password");
      setIsOpen(true);
    }
    else {
      setSpinner(false);
      setToast("Something went wrong, please try again");
      setIsOpen(true);
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
          <IonRow className="ion-text-center">
            <IonCol></IonCol>
            <IonCol>
              <IonTitle>Welcome to </IonTitle>
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
              <IonCol className="ion-text-center">
                <IonButton id="login-button" onClick={tryLogin}>
                  Log in
                </IonButton>
              </IonCol>
              <IonCol>{spinner && (<IonSpinner></IonSpinner>)}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <p>
                  Don't have an account yet? Sign up <a href="/signup">here</a>
                </p>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
        <IonToast
            isOpen={isOpen}
            message={toastMessage}
            onDidDismiss={() => setIsOpen(false)}
            duration={5000}
          ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Login;
