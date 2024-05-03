import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar, IonCardHeader, IonCardSubtitle, IonButton, IonIcon, IonRouterLink, 
} from "@ionic/react";
import React from "react";
import { trashOutline } from 'ionicons/icons';

const Lists: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
      </IonContent>
    </IonPage>
  );
};

export default Lists;
