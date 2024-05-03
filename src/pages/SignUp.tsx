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
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
