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

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log in</IonTitle>
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
          <IonButton>Log in</IonButton>
        </IonItem>
        <p>
          Don't have an account yet? Sign up <a href="/signup">here</a>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
