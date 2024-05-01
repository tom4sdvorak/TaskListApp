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
        <form>
          <IonItem>
            <IonTitle>Email</IonTitle>
            <IonInput type="email" placeholder="email"></IonInput>
          </IonItem>
          <IonItem>
            <IonTitle>Password</IonTitle>
            <IonInput type="password" placeholder="password"></IonInput>
          </IonItem>
          <IonRow className="flex text-center">
            <IonCol></IonCol>
            <IonCol>
              <IonButton>Sign up</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          <p>
            Already have an account? Log in <a href="/login">here</a>
          </p>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
