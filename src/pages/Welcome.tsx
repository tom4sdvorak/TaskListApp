import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Welcome: React.FC = () => {
  return (
    <IonPage>
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

          <IonRow className="ion-padding">
            <IonCol></IonCol>
            <IonCol>
              <IonButton href="/login">Login</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="ion-padding">
            <IonCol></IonCol>
            <IonCol>
              <IonButton href="/signup">SignUp</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
