import {
  IonButtons,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircle, addOutline } from "ionicons/icons";
import React from "react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Click plus button to add a list
        <IonFabButton>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
