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

const Login: React.FC = () => {
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
            ></IonInput>

            <IonInput
              fill="outline"
              type="password"
              placeholder="password"
            ></IonInput>
          </div>

          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton>Log in</IonButton>
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
