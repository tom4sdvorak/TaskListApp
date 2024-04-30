import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonTitle>Email</IonTitle>
          <IonInput type="email" placeholder="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonTitle>Password</IonTitle>
          <IonInput type="password" placeholder="password"></IonInput>
        </IonItem>
        <IonItem>
          <IonButton>Sign up</IonButton>
        </IonItem>
        <p>
          Already have an account? Log in <a href="/login">here</a>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
