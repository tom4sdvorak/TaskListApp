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
import React from "react";
import "./Home.css";

const SignUp: React.FC = () => {
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
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonTitle>Task App</IonTitle>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <form>
            <div className="flex ion-padding ion-margin">
              <IonInput
                className="ion-margin-bottom"
                fill="outline"
                type="email"
                placeholder="email"
              ></IonInput>

              <IonInput
                fill="outline"
                type="password"
                placeholder="password"
              ></IonInput>
            </div>
            <IonRow className="flex text-center">
              <IonCol></IonCol>
              <IonCol>
                <IonButton>Sign up</IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>

            <p className="ion-padding">
              Already have an account? Log in <a href="/login">here</a>
            </p>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
