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
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { registerUser } from "../firebaseCfg";
import { useHistory } from "react-router";
import "../theme/variables.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToast] = useState("Passwords do not match!");
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };

  async function regUser() {
    if (password !== confirm) {
      setToast("Passwords do not match!");
      setIsOpen(true);
      return false;
    }
    if (email.trim() === "" || password.trim() === "") {
      setToast("Email and password are required");
      setIsOpen(true);
      return false;
    }
    if (password.length < 6) {
      setToast("Password must be longer than 6 characters");
      setIsOpen(true);
      return false;
    }
    const res = await registerUser(email, password);
    if (res) {
      setToast("You have been registered! Redirecting in 5s...");
      setIsOpen(true);
      setTimeout(redirectToLogin, 5000);
    } else {
      setToast("Something went wrong");
      setIsOpen(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
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
                placeholder="Email"
                onIonInput={(e: any) => setEmail(e.target.value)}
              ></IonInput>

              <IonInput
                className="ion-margin-bottom"
                fill="outline"
                type="password"
                placeholder="Password"
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>

              <IonInput
                fill="outline"
                type="password"
                placeholder="Confirm password"
                onIonInput={(e: any) => setConfirm(e.target.value)}
              ></IonInput>
            </div>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <IonButton id="signup-button" onClick={regUser}>
                  Sign up
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>

            <p className="ion-padding">
              Already have an account? Log in{" "}
              <a onClick={redirectToLogin}>here</a>
            </p>
          </form>

          <IonToast
            isOpen={isOpen}
            message={toastMessage}
            onDidDismiss={() => setIsOpen(false)}
            duration={5000}
          ></IonToast>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
